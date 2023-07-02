const mongoose = require('mongoose');

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'City name can not empty!'],
    },
    prefix: {
      type: String, // Lang key prefix
      default: 'th_key_city',
    },
  },
  { id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

citySchema.virtual('districts', {
  ref: 'District',
  foreignField: 'city',
  localField: '_id',
});

const City = mongoose.model('City', citySchema);
module.exports = City;
