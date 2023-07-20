const mongoose = require('mongoose');

const chats = [
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64b5faf9425cb1656fea6acf'
    ),
    users: [
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64a0163810f4179aa8f4c7b3'
        ),
        isAchieve: false,
      },
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b253f56dc6525e4693f475'
        ),
        isAchieve: false,
      },
    ],
    lastMessage: mongoose.Types.ObjectId.createFromHexString(
      '64b5fb4edf6452de0eb6abb8'
    ),
  },
];
const messages = [
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64b5fb4edf6452de0eb6abb8'
    ),
    chat: mongoose.Types.ObjectId.createFromHexString(
      '64b5faf9425cb1656fea6acf'
    ),
    sender: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    content: 'Hello 1',
  },
];

module.exports = {
  chats,
  messages,
};
