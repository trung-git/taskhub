const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'District name can not empty!'],
    },
    prefix: {
      type: String, // Lang key prefix
    },
    city: {
      type: mongoose.Schema.ObjectId,
      ref: 'City',
    },
  },
  { id: false }
);

districtSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'city',
    select: '-__v -updatedAt -createdAt',
  });
  next();
});

const District = mongoose.model('District', districtSchema);
module.exports = District;
