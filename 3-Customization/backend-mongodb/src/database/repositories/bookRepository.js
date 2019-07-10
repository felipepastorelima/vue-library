const AbstractEntityRepository = require('./abstractEntityRepository');
const MongooseQuery = require('../utils/mongooseQuery');
const AuditLogRepository = require('./auditLogRepository');
const Book = require('../models/book');
const Loan = require('../models/loan');
const ValidationError = require('../../errors/validationError');

class BookRepository extends AbstractEntityRepository {
  async create(data, options) {
    await Book.createCollection();
    const [record] = await Book.create(
      [
        {
          ...data,
          createdBy: this.getCurrentUser(options).id,
          updatedBy: this.getCurrentUser(options).id,
        },
      ],
      this.getSessionOptionsIfExists(options),
    );

    await this._auditLogs(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options,
    );

    await this.refreshTwoWayRelations(record, options);

    return this.findById(record.id, options);
  }

  async update(id, data, options) {
    await this.wrapWithSessionIfExists(
      Book.updateOne(
        { _id: id },
        {
          ...data,
          updatedBy: this.getCurrentUser(options).id,
        },
      ),
      options,
    );

    await this._auditLogs(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    const record = await this.findById(id, options);
    await this.refreshTwoWayRelations(record, options);
    return record;
  }

  async destroy(id, options) {
    await this.wrapWithSessionIfExists(
      Book.deleteOne({ _id: id }),
      options,
    );

    await this._auditLogs(
      AuditLogRepository.DELETE,
      id,
      null,
      options,
    );

    await this.destroyFromRelations(id, options);
  }

  async count(filter, options) {
    return this.wrapWithSessionIfExists(
      Book.countDocuments(filter),
      options,
    );
  }

  async refreshTwoWayRelations(record, options) {}

  async destroyFromRelations(id, options) {
    await this.destroyRelationToOne(
      id,
      Loan,
      'book',
      options,
    );
  }

  async findById(id, options) {
    return this.wrapWithSessionIfExists(
      Book.findById(id),
      options,
    );
  }

  async findAndCountAll(
    {
      requestedAttributes,
      filter,
      limit,
      offset,
      orderBy,
    } = {
      requestedAttributes: null,
      filter: null,
      limit: 0,
      offset: 0,
      orderBy: null,
    },
    options,
  ) {
    const query = MongooseQuery.forList({
      limit,
      offset,
      orderBy: orderBy || 'createdAt_DESC',
    });

    if (filter) {
      if (filter.id) {
        query.appendId('_id', filter.id);
      }

      if (filter.isbn) {
        query.appendIlike('isbn', filter.isbn);
      }

      if (filter.title) {
        query.appendIlike('title', filter.title);
      }

      if (filter.author) {
        query.appendIlike('author', filter.author);
      }

      if (filter.status) {
        if (filter.status === 'available') {
          query.appendCustom({
            stock: { $gt: 0 },
          });
        }

        if (filter.status === 'unavailable') {
          query.appendCustom({
            stock: { $lte: 0 },
          });
        }
      }

      if (filter.createdAtRange) {
        query.appendRange(
          'createdAt',
          filter.createdAtRange,
        );
      }
    }

    const rows = await Book.find(query.criteria)
      .skip(query.skip)
      .limit(query.limit)
      .sort(query.sort);

    const count = await Book.countDocuments(query.criteria);

    return { rows, count };
  }

  async findAllAutocomplete(search, limit) {
    let query = MongooseQuery.forAutocomplete({
      limit,
      orderBy: 'title_ASC',
    });

    if (search) {
      query.appendId('_id', search);
      query.appendIlike('title', search);
      query.appendIlike('author', search);
      query.appendIlike('isbn', search);
    }

    const records = await Book.find(query.criteria)
      .limit(query.limit)
      .sort(query.sort);

    return records.map((record) => ({
      id: record.id,
      label: `${record['title']} - ${record['author']} - ${
        record['isbn']
      }`,
      stock: record['stock'],
    }));
  }

  async _auditLogs(action, id, data, options) {
    await AuditLogRepository.log(
      {
        entityName: Book.modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }

  async refreshStock(id, options) {
    const book = await this.findById(id, options);

    const booksNotInStock = await this.wrapWithSessionIfExists(
      Loan.countDocuments({ book: id, returnDate: null }),
      options,
    );

    const stock =
      Number(book.numberOfCopies) - Number(booksNotInStock);

    if (stock < 0) {
      throw new ValidationError(
        options.language,
        'entities.book.validation.bookOutOfStock',
      );
    }

    await this.wrapWithSessionIfExists(
      Book.updateOne({ _id: id }, { stock }),
      options,
    );
  }
}

module.exports = BookRepository;
