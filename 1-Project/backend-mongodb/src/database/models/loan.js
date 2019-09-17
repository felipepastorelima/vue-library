const database = require('../database');
const Schema = database.Schema;

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
    status: {
      type: String,
      enum: [
        "inProgress",
        "overdue",
        "closed",
        null
      ],
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

LoanSchema.set('toJSON', {
  getters: true,
});

LoanSchema.set('toObject', {
  getters: true,
});

const Loan = database.model('loan', LoanSchema);

module.exports = Loan;
