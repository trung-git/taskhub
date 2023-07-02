const mongoose = require('mongoose');
const User = require('./userModel');

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
        date: { type: String },
        start: { type: String },
        end: { type: String },
      },
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
    profile: {
      aboutMe: {
        type: String,
      },
      skillAndExperience: {
        type: String,
      },
      photo: [{ type: String }],
      vehicle: {
        type: String,
      },
    },
    contracts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Contract',
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  baseOptions
);

taskerSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'taskTag.taskInfo',
    select: '-__v -updatedAt -createdAt',
  });
  this.populate({
    path: 'reviews',
    select: '-__v -updatedAt -createdAt',
  });
  next();
});

const Tasker = User.discriminator('Tasker', taskerSchema);
module.exports = Tasker;
