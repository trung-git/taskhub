const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
      type: Number,
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

const User = mongoose.model('User', userSchema);
module.exports = User;
