const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const baseOptions = { discriminatorKey: 'role', timestamps: true };

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
    },
    email: {
      type: String,
      required: [true, 'Email can not empty!'],
      unique: true,
      validate: [validator.isEmail, '{VALUE} is not a valid email'],
    },
    phoneNumber: {
      type: Number,
      validate: {
        validator: function (v) {
          return validator.isMobilePhone(v, ['vi-VN']);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    address: {
      //GeoJSON
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
      inputAddress: String,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: [true, 'Gender can not empty!'],
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
