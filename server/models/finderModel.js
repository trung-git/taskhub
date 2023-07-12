const mongoose = require('mongoose');
const User = require('./userModel');

const baseOptions = { discriminatorKey: 'role', timestamps: true, id: false };

const finderSchema = new mongoose.Schema(
  {
    city: { type: mongoose.Schema.ObjectId, ref: 'City' },
  },
  baseOptions
);
finderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'city',
    select: '-__v -updatedAt -createdAt',
  });
  next();
});
const Finder = User.discriminator('Finder', finderSchema);
module.exports = Finder;
