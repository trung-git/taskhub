const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Types.ObjectId,
      ref: 'Chat',
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
