const mongoose = require('mongoose');
const User = require('./userModel');

const baseOptions = { discriminatorKey: 'role', timestamps: true };

const finderSchema = new mongoose.Schema({}, baseOptions);

const Finder = User.discriminator('Finder', finderSchema);
module.exports = Finder;
