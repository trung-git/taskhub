const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
    },
    users: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'User',
        },
      ],
      required: [true, 'Chat box must have users!'],
      validate: {
        validator: function (v) {
          return v.length === 2;
        },
        message: () => `Chat box have only 2 users`,
      },
    },
    messages: [
      {
        sender: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
        },
        content: {
          type: String,
        },
        createAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    lastMessage: {
      sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
      content: {
        type: String,
      },
      createAt: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
