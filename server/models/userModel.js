const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
    required: [true, 'Date of birth can not empty!'],
  },
  email: {
    type: String,
    required: [true, 'Email can not empty!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: [true, 'Gender can not empty!'],
  },
  role: {
    type: String,
    enum: ['Tasker', 'Finder'],
    required: [true, 'Role can not empty!'],
  },
  password: {
    type: String,
    required: [true, 'Password can not empty'],
    minlength: 8,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

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
