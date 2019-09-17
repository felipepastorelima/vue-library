const genericFixture = require('./genericFixture');
const LoanRepository = require('../database/repositories/loanRepository');

const loanFixture = genericFixture({
  idField: 'id',
  createFn: (data) => new LoanRepository().create(data),
  data: [
    {
      id: '1',
      // Add attributes here
    },
  ],
});

module.exports = loanFixture;
