const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      required: [true, 'Rating cant be empty'],
    },
    review: {
      type: String,
      required: [true, 'Review can not be empty'],
    },
    taskTag: {
      type: mongoose.Schema.ObjectId,
      ref: 'Task Tag',
      required: [true, 'Review must belong to a Task Tag'],
    },
    user: {
      // User write review
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a User'],
    },
  },
  { id: false, timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'taskTag',
    select: '-__v -updatedAt -createdAt',
  });
  this.populate({
    path: 'user',
    select: '-__v -updatedAt -createdAt -password',
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
