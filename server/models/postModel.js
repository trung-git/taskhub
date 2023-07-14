const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'Finder',
    required: [true, 'Candidate can not empty!'],
  },
  text: {
    type: String,
    required: [true, 'Text content of post can not empty!'],
  },
  photo: [String],
  candidate: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tasker',
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
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
