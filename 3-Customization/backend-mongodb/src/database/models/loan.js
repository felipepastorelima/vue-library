const database = require('../database');
const Schema = database.Schema;
const moment = require('moment');

const LoanSchema = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'book',
      required: true,
    },
    member: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    importHash: { type: String },
  },
  { timestamps: true },
);

LoanSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

LoanSchema.virtual('status').get(function() {
  if (this.returnDate) {
    return 'closed';
  }

  if (moment().isAfter(moment(this.dueDate))) {
    return 'overdue';
  }

  return 'inProgress';
});

LoanSchema.set('toJSON', {
  getters: true,
});

LoanSchema.set('toObject', {
  getters: true,
});

const Loan = database.model('loan', LoanSchema);

module.exports = Loan;
