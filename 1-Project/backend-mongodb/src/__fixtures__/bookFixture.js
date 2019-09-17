const genericFixture = require('./genericFixture');
const BookRepository = require('../database/repositories/bookRepository');

const bookFixture = genericFixture({
  idField: 'id',
  createFn: (data) => new BookRepository().create(data),
  data: [
    {
      id: '1',
      // Add attributes here
    },
  ],
});

module.exports = bookFixture;
