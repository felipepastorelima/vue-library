const database = require('../database');
const Schema = database.Schema;
const { FileSchema } = require('./file');

const UserSchema = new Schema(
  {
    fullName: { type: String, maxlength: 255 },
    firstName: { type: String, maxlength: 80 },
    lastName: { type: String, maxlength: 175 },
    phoneNumber: { type: String, maxlength: 24 },
    email: { type: String, maxlength: 255, index: {unique: true} },
    authenticationUid: { type: String, maxlength: 255 },
    password: { type: String, maxlength: 255 },
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: {
      type: String,
      maxlength: 255,
    },
    emailVerificationTokenExpiresAt: { type: Date },
    passwordResetToken: {
      type: String,
      maxlength: 255,
    },
    passwordResetTokenExpiresAt: { type: Date },
    disabled: { type: Boolean, default: false },
    avatars: [FileSchema],
    roles: [{ type: String }],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    importHash: { type: String, maxlength: 255 },
  },
  { timestamps: true },
);

UserSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

UserSchema.set('toJSON', {
  getters: true,
});

UserSchema.set('toObject', {
  getters: true,
});

const User = database.model('user', UserSchema);

module.exports = User;
