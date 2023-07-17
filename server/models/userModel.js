const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto')

const baseOptions = { discriminatorKey: 'role', timestamps: true, id: false };

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username can not empty!'],
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, 'First name can not empty!'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name can not empty!'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date Of Birth can not empty!'],
    },
    email: {
      type: String,
      required: [true, 'Email can not empty!'],
      unique: true,
      validate: [validator.isEmail, '{VALUE} is not a valid email'],
    },
    phoneNumber: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: [true, 'Gender can not empty!'],
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Password can not empty'],
      minlength: 8,
      select: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpired: Date,
    verifyEmailToken: String,
    verifyEmailExpired: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  baseOptions
);

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 10
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpired = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.createVerifyEmailToken = function () {
  const verifyEmailToken = crypto.randomBytes(6).toString('hex');

  this.verifyEmailToken = crypto
    .createHash('sha256')
    .update(verifyEmailToken)
    .digest('hex');

  this.verifyEmailExpired = Date.now() + 10 * 60 * 1000;

  return verifyEmailToken;
};
const User = mongoose.model('User', userSchema);
module.exports = User;
