const { i18n } = require('../i18n');
const moment = require('moment');

module.exports = class LoanInProgressEmail {
  constructor(language, loan) {
    this.language = language;
    this.to = loan.member.email;
    this.loan = loan;
  }

  get subject() {
    return i18n(
      this.language,
      'emails.loan.inProgress.subject',
      this.loan.book.title,
      moment(this.loan.dueDate).diff(moment(), 'days'),
    );
  }

  get html() {
    return i18n(
      this.language,
      'emails.loan.inProgress.body',
      i18n(this.language, 'app.title'),
      this.loan.book.title,
      moment(this.loan.dueDate).diff(moment(), 'days'),
      this.loan.member.firstName,
    );
  }
};
