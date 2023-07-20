const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    users: {
      type: [
        {
          user: { type: mongoose.Types.ObjectId, ref: 'User' },
          isAchieve: {
            type: Boolean,
            default: false,
          },
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
    lastMessage: {
      type: mongoose.Types.ObjectId,
      ref: 'Message',
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;