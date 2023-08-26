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
    unavailableTime: [
      {
        date: Date,
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
    wallet: {
      type: mongoose.Types.ObjectId,
      ref: "Wallet"
    }
  },
  baseOptions
);

taskerSchema.pre('save', async function (next) {
  // Only run this function if reviews was actually modified
  if (!this.isModified('reviews')) return next();

  const reviewIds = this.reviews;
  const reviews = await Review.find({ _id: { $in: reviewIds } });
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  this.averageRating = reviews.length > 0 ? total / reviews.length : 0;
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
  this.populate({
    path: 'wallet',
  });
  next();
});

const Tasker = User.discriminator('Tasker', taskerSchema);
module.exports = Tasker;
