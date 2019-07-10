const { i18n } = require('../i18n');
const moment = require('moment');

module.exports = class LoanOverdueEmail {
  constructor(language, loan) {
    this.language = language;
    this.to = loan.member.email;
    this.loan = loan;
  }

  get subject() {
    return i18n(
      this.language,
      'emails.loan.overdue.subject',
      this.loan.book.title,
    );
  }

  get html() {
    return i18n(
      this.language,
      'emails.loan.overdue.body',
      i18n(this.language, 'app.title'),
      this.loan.book.title,
      this.loan.member.firstName,
    );
  }
};
