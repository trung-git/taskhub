const mongoose = require('mongoose');
const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Candidate can not empty!'],
    },
    text: {
      type: String,
      required: [true, 'Text content of post can not empty!'],
    },
    photos: [String],
    taskTag: {
      type: mongoose.Schema.ObjectId,
      ref: 'Task Tag',
      required: [true, 'Task tag can not empty!'],
    },
    candidate: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: [true, 'Candidate can not empty!'],
        },
        text: {
          type: String,
          required: [true, 'Text content of candidate comment can not empty!'],
        },
        price: {
          type: Number,
          required: [true, 'Price can not empty!'],
        },
      },
    ],
    address: {
      type: String,
      required: [true, 'Address can not empty!'],
    },
    workLocation: {
      type: mongoose.Types.ObjectId,
      ref: 'District',
      required: [true, 'Work location can not empty!'],
    },
    workTime: {
      type: {
        from: Date,
        to: Date,
      },
      required: [true, 'work Time can not empty!'],
    },
    officialContract: {
      type: mongoose.Types.ObjectId,
      ref: "Contract"
    },
    closeRegisterAt: {
      type: Date,
    }
  },
  { timestamps: true }
);
postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '-__v -updatedAt -createdAt -password',
  });
  this.populate({
    path: 'taskTag',
    select: '-__v -updatedAt -createdAt',
  });
  this.populate({
    path: 'candidate.user',
    select: '-__v -updatedAt -createdAt -password',
  });
  this.populate({
    path: 'workLocation',
  });
  next();
});
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
