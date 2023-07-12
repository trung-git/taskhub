const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'Finder',
    require: [true, 'Candidate can not empty!'],
  },
  text: {
    type: String,
    require: [true, 'Text content of post can not empty!'],
  },
  photo: [String],
  candidate: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tasker',
        require: [true, 'Candidate can not empty!'],
      },
      text: {
        type: String,
        require: [true, 'Text content of candidate comment can not empty!'],
      },
    },
  ],
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
