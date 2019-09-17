const models = require('../models');
const SequelizeFilter = require('../utils/sequelizeFilter');
const SequelizeAutocompleteFilter = require('../utils/sequelizeAutocompleteFilter');
const AbstractRepository = require('./abstractRepository');
const AuditLogRepository = require('./auditLogRepository');
const FileRepository = require('./fileRepository');
const lodash = require('lodash');

class LoanRepository extends AbstractRepository {
  constructor() {
    super();

    this.inTableAttributes = [
      'id',
      'issueDate',
      'dueDate',
      'returnDate',
      'status',
      'importHash',
      'updatedAt',
      'createdAt',
    ];

    this.fileAttributes = [

    ];

    this.relationToOneAttributes = {
      book: {
        model: models.book,
        as: 'book',
      },
      member: {
        model: models.user,
        as: 'member',
      },
    };

    this.relationToManyAttributes = {

    };
  }

  async create(data, options) {
    const record = await models.loan.create(
      {
        ...lodash.pick(data, this.inTableAttributes),
        createdById: AbstractRepository.getCurrentUser(
          options,
        ).id,
        updatedById: AbstractRepository.getCurrentUser(
          options,
        ).id,
      },
      {
        transaction: AbstractRepository.getTransaction(
          options,
        ),
      },
    );

    await this._createOrUpdateRelations(
      record,
      data,
      options,
    );

    await this._createOrUpdateFiles(record, data, options);

    await this._auditLogs(
      AuditLogRepository.CREATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  async update(id, data, options) {
    let record = await models.loan.findByPk(id, {
      transaction: AbstractRepository.getTransaction(
        options,
      ),
    });

    record = await record.update(
      {
        ...lodash.pick(data, this.inTableAttributes),
        updatedById: AbstractRepository.getCurrentUser(
          options,
        ).id,
      },
      {
        transaction: AbstractRepository.getTransaction(
          options,
        ),
      },
    );

    await this._createOrUpdateRelations(
      record,
      data,
      options,
    );

    await this._createOrUpdateFiles(record, data, options);

    await this._auditLogs(
      AuditLogRepository.UPDATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  async destroy(id, options) {
    let record = await models.loan.findByPk(id, {
      transaction: AbstractRepository.getTransaction(
        options,
      ),
    });

    await record.destroy({
      transaction: AbstractRepository.getTransaction(
        options,
      ),
    });

    await this._auditLogs(
      AuditLogRepository.DELETE,
      record,
      null,
      options,
    );
  }

  async findById(id, options) {
    const record = await models.loan.findByPk(
      id,
      {
        include: this._buildIncludeForQueries(),
        transaction: AbstractRepository.getTransaction(
          options,
        ),
      },
    );

    return this._fillNonTableAttributesForRecord(
      record,
      null,
      options,
    );
  }

  async count(filter, options) {
    return models.loan.count(
      {
        where: filter,
      },
      {
        transaction: AbstractRepository.getTransaction(
          options,
        ),
      },
    );
  }

  async _auditLogs(action, record, data, options) {
    let values = {};

    if (data) {
      values = {
        ...record.get({ plain: true }),
      };

      this.fileAttributes.forEach((field) => {
        values[field] = data[field];
      });

      Object.keys(this.relationToManyAttributes).forEach(
        (field) => {
          values[`${field}Ids`] = data[field];
        },
      );
    }

    await AuditLogRepository.log(
      {
        entityName: 'loan',
        entityId: record.id,
        action,
        values,
      },
      options,
    );
  }

  async _createOrUpdateRelations(record, data, options) {
    for (const field of Object.keys(
      this.relationToManyAttributes,
    )) {
      await record[`set${AbstractRepository.jsUcfirst(field)}`](
        data[field] || [],
        {
          transaction: AbstractRepository.getTransaction(
            options,
          ),
        },
      );
    }

    for (const field of Object.keys(
      this.relationToOneAttributes,
    )) {
      await record[`set${AbstractRepository.jsUcfirst(field)}`](
        data[field] || null,
        {
          transaction: AbstractRepository.getTransaction(
            options,
          ),
        },
      );
    }
  }

  async _createOrUpdateFiles(record, data, options) {
    for (const field of this.fileAttributes) {
      await FileRepository.replaceRelationFiles(
        {
          belongsTo: models.loan.getTableName(),
          belongsToColumn: field,
          belongsToId: record.id,
        },
        data[field],
        options,
      );
    }
  }

  _buildIncludeForQueries(attributes, includeToAppend) {
    if (!attributes) {
      return Object.keys(this.relationToOneAttributes).map(
        (key) => this.relationToOneAttributes[key],
      );
    }

    const attributesToInclude = lodash.intersection(
      attributes,
      Object.keys(this.relationToOneAttributes),
    );

    const nonIncludedYet = attributesToInclude.filter(
      (attribute) =>
        !includeToAppend.some(
          (included) => included.as === attribute,
        ),
    );

    return nonIncludedYet
      .map(
        (attribute) =>
          this.relationToOneAttributes[attribute],
      )
      .concat(includeToAppend);
  }

  async _fillNonTableAttributesForRows(
    rows,
    requestedAttributes,
    options,
  ) {
    if (!rows) {
      return rows;
    }

    return Promise.all(
      rows.map((record) =>
        this._fillNonTableAttributesForRecord(
          record,
          requestedAttributes,
          options,
        ),
      ),
    );
  }

  async _fillNonTableAttributesForRecord(
    record,
    requestedAttributes,
    options,
  ) {
    if (!record) {
      return record;
    }

    function isRequestedAttribute(fieldName) {
      if (
        !requestedAttributes ||
        requestedAttributes.length
      ) {
        return true;
      }

      return requestedAttributes.includes(fieldName);
    }

    const output = record.get({ plain: true });

    const fields = Object.keys(
      this.relationToManyAttributes,
    )
      .concat(this.fileAttributes)
      .filter(isRequestedAttribute);

    for (const field of fields) {
      output[field] = await record[
        `get${AbstractRepository.jsUcfirst(field)}`
      ]({
        transaction: AbstractRepository.getTransaction(
          options,
        ),
      });
    }

    return output;
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
    let sequelizeFilter = new SequelizeFilter(
      models.Sequelize,
    );

    if (filter) {
      if (filter.id) {
        sequelizeFilter.appendId('id', filter.id);
      }

      if (filter.book) {
        sequelizeFilter.appendId('bookId', filter.book);
      }

      if (filter.member) {
        sequelizeFilter.appendId('memberId', filter.member);
      }

      if (filter.issueDateRange) {
        sequelizeFilter.appendRange(
          'issueDate',
          filter.issueDateRange,
        );
      }

      if (filter.dueDateRange) {
        sequelizeFilter.appendRange(
          'dueDate',
          filter.dueDateRange,
        );
      }

      if (filter.returnDateRange) {
        sequelizeFilter.appendRange(
          'returnDate',
          filter.returnDateRange,
        );
      }

      if (filter.status) {
        sequelizeFilter.appendEqual('status', filter.status);
      }

      if (filter.createdAtRange) {
        sequelizeFilter.appendRange(
          'createdAt',
          filter.createdAtRange,
        );
      }
    }

    const include = this._buildIncludeForQueries(
      requestedAttributes,
      sequelizeFilter.getInclude(),
    );

    const requestedAttributesInTable =
      requestedAttributes && requestedAttributes.length
        ? [
            'id',
            ...lodash.intersection(
              this.inTableAttributes,
              requestedAttributes,
            ),
          ]
        : undefined;

    let { rows, count } = await models.loan.findAndCountAll({
      where: sequelizeFilter.getWhere(),
      include,
      attributes: requestedAttributesInTable,
      limit: limit ? limit : undefined,
      offset: offset || undefined,
      order: orderBy
        ? [orderBy.split('_')]
        : [['createdAt', 'DESC']],
      transaction: AbstractRepository.getTransaction(
        options,
      ),
    });

    rows = await this._fillNonTableAttributesForRows(
      rows,
      requestedAttributes,
      options,
    );

    return { rows, count };
  }

  async findAllAutocomplete(query, limit) {
    const filter = new SequelizeAutocompleteFilter(
      models.Sequelize,
    );

    if (query) {
      filter.appendId('id', query);

    }

    const records = await models.loan.findAll({
      attributes: ['id', 'id'],
      where: filter.getWhere(),
      limit: limit || undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }
}

module.exports = LoanRepository;
