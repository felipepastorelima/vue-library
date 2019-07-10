const LoanRepository = require('../database/repositories/loanRepository');
const BookRepository = require('../database/repositories/bookRepository');
const ValidationError = require('../errors/validationError');
const AbstractRepository = require('../database/repositories/abstractRepository');
const Roles = require('../security/roles');
const SettingsService = require('../services/settingsService');
const moment = require('moment');
const LoanOverdueEmail = require('../emails/loanOverdueEmail');
const LoanInProgressEmail = require('../emails/loanInProgressEmail');
const EmailSender = require('./shared/email/emailSender');

module.exports = class LoanService {
  constructor({ currentUser, language }) {
    this.repository = new LoanRepository();
    this.bookRepository = new BookRepository();
    this.currentUser = currentUser;
    this.language = language;
  }

  async create(data) {
    data.dueDate = await this._calculateDueDate(data);

    const transaction = await AbstractRepository.createTransaction();

    try {
      const record = await this.repository.create(data, {
        transaction,
        currentUser: this.currentUser,
      });

      try {
        await this.bookRepository.refreshStock(
          record.bookId,
          {
            transaction,
            currentUser: this.currentUser,
            language: this.language,
          },
        );
      } catch (error) {
        if (error instanceof ValidationError) {
          throw new ValidationError(
            this.language,
            'entities.loan.validation.bookOutOfStock',
          );
        }

        throw error;
      }

      await AbstractRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await AbstractRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  async update(id, data) {
    if (!data.returnDate) {
      throw new ValidationError(
        this.language,
        'entities.loan.validation.returnDateRequired',
      );
    }

    const transaction = await AbstractRepository.createTransaction();

    try {
      const record = await this.repository.update(
        id,
        data,
        {
          transaction,
          currentUser: this.currentUser,
        },
      );

      await this.bookRepository.refreshStock(
        record.bookId,
        {
          transaction,
          currentUser: this.currentUser,
          language: this.language,
        },
      );

      await AbstractRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await AbstractRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  async destroyAll(ids) {
    const transaction = await AbstractRepository.createTransaction();

    try {
      for (const id of ids) {
        const record = await this.repository.findById(id, {
          transaction,
          currentUser: this.currentUser,
        });

        await this.repository.destroy(id, {
          transaction,
          currentUser: this.currentUser,
        });

        await this.bookRepository.refreshStock(
          record.bookId,
          {
            transaction,
            currentUser: this.currentUser,
            language: this.language,
          },
        );
      }

      await AbstractRepository.commitTransaction(
        transaction,
      );
    } catch (error) {
      await AbstractRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  async findById(id) {
    return this.repository.findById(id);
  }

  async findAllAutocomplete(search, limit) {
    return this.repository.findAllAutocomplete(
      search,
      limit,
    );
  }

  async findAndCountAll(args) {
    const isMember =
      this.currentUser.roles.includes(
        Roles.values.member,
      ) &&
      !this.currentUser.roles.includes(
        Roles.values.librarian,
      );

    if (isMember) {
      args.filter = {
        ...args.filter,
        member: this.currentUser.id,
      };
    }

    return this.repository.findAndCountAll(args);
  }

  async sendEmails(ids) {
    const {
      rows: loans,
    } = await this.repository.findAndCountAll({
      filter: {
        ids,
      },
      requestedAttributes: null,
      limit: null,
      offset: null,
      orderBy: null,
    });

    if (loans.some((loan) => loan.status === 'closed')) {
      throw new ValidationError(
        this.language,
        'entities.loan.validation.closedLoansSelectedForEmail',
      );
    }

    const overdueLoansEmails = loans
      .filter((loan) => loan.status === 'overdue')
      .map(
        (loan) => new LoanOverdueEmail(this.language, loan),
      );

    const inProgressLoansEmails = loans
      .filter((loan) => loan.status === 'inProgress')
      .map(
        (loan) =>
          new LoanInProgressEmail(this.language, loan),
      );

    await Promise.all(
      [...overdueLoansEmails, ...inProgressLoansEmails].map(
        (email) => new EmailSender(email).send(),
      ),
    );
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new ValidationError(
        this.language,
        'importer.errors.importHashRequired',
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new ValidationError(
        this.language,
        'importer.errors.importHashExistent',
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await this.repository.count({
      importHash,
    });

    return count > 0;
  }

  async _calculateDueDate(data) {
    const settings = await SettingsService.findOrCreateDefault(
      this.currentUser,
    );

    return moment(data.issueDate)
      .add(settings.loanPeriodInDays, 'days')
      .toISOString();
  }
};
