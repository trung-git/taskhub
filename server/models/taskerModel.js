const mongoose = require('mongoose');
const User = require('./userModel');
const geocoder = require('../utils/geocoder');

const baseOptions = {
  discriminatorKey: 'role',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
};

const taskerSchema = new mongoose.Schema(
  {
    address: {
      //GeoJSON
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
        required: [true, 'Address coordinates can not empty!'],
      },
      inputAddress: {
        type: String,
        required: [true, 'Address can not empty!'],
      },
    },
    taskTag: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Task Tag',
      },
    ],
  },
  baseOptions
);

// taskerSchema.pre('save', async function (next) {
//   const loc = await geocoder.geocode(this.address);
//   console.log({ loc });
//   this.location = {
//     type: 'Point',
//     coordinates: [loc[0].longitude, loc[0].latitude],
//     formattedAddress: loc[0].formattedAddress,
//   };

//   // Do not save address
//   this.address = undefined;
//   next();
// });
taskerSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'taskTag',
    select: '-__v -updatedAt -createdAt',
  });
  next();
});
const Tasker = User.discriminator('Tasker', taskerSchema);
module.exports = Tasker;
