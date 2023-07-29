const mongoose = require('mongoose');
const User = require('./userModel');
const Review = require('./reviewModel');

const baseOptions = {
  discriminatorKey: 'role',
  timestamps: true,
  id: false,
};

const taskerSchema = new mongoose.Schema(
  {
    workLocation: [{ type: mongoose.Schema.ObjectId, ref: 'District' }],
    workTime: [
      {
        index: { type: String },
        start: { type: String },
        end: { type: String },
      },
    ],
    unavailableTime: [
      {
        date: String,
        time: {
          from: String,
          to: String
        }
      }
    ],
    taskTag: [
      {
        taskInfo: {
          type: mongoose.Schema.ObjectId,
          ref: 'Task Tag',
        },
        price: {
          type: Number,
          // Per hours
        },
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Review',
      },
    ],

    aboutMe: {
      type: String,
    },
    skillAndExperience: {
      type: String,
    },
    photos: [{ type: String }],
    vehicle: {
      type: String,
    },

    contracts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Contract',
      },
    ],
    averageRating: {
      type: Number,
    },
  },
  baseOptions
);

taskerSchema.pre('save', async function (next) {
  const reviewIds = this.reviews; // Mảng các reference id
  const reviews = await Review.find({ _id: { $in: reviewIds } });
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  this.averagePrice = reviews.length > 0 ? total / reviews.length : 0;
  next();
});

taskerSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'taskTag.taskInfo',
    select: '-__v -updatedAt -createdAt',
  });
  this.populate({
    path: 'reviews',
    select: '-__v -updatedAt -createdAt',
  });
  this.populate({
    path: 'workLocation',
    select: '-__v -updatedAt -createdAt',
  });
  next();
});

const Tasker = User.discriminator('Tasker', taskerSchema);
module.exports = Tasker;
