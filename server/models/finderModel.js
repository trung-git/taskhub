const mongoose = require('mongoose');
const User = require('./userModel');

const baseOptions = { discriminatorKey: 'role', timestamps: true, id: false };

const finderSchema = new mongoose.Schema(
  {
    city: { type: mongoose.Schema.ObjectId, ref: 'City' },
  },
  baseOptions
);

const Finder = User.discriminator('Finder', finderSchema);
module.exports = Finder;
