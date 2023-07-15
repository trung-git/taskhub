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
    photo: [String],
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
  next();
});
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
