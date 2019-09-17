const userFixture = require('./userFixture');
const loanFixture = require('./loanFixture');
const bookFixture = require('./bookFixture');
const AbstractRepository = require('../database/repositories/abstractRepository');

module.exports = {
  user: userFixture,
  loan: loanFixture,
  book: bookFixture,

  async cleanDatabase() {
    await AbstractRepository.cleanDatabase();
  },
};
