const mongoose = require('mongoose');
const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

exports.getChats = catchAsync(async (req, res, next) => {
  const chats = await Chat.find({
    users: { $elemMatch: { user: req.user._id, isAchieve: false } },
  })
    .populate({
      path: 'users.user',
      select: '-password',
    })
    .populate({
      path: 'lastMessage',
      select: '-updatedAt',
      populate: {
        path: 'sender',
      },
    });

  res.status(200).json({
    status: 'success',
    data: chats,
  });
});

exports.getChatById = catchAsync(async (req, res, next) => {
  const chat = await Chat.findOne({
    _id: mongoose.Types.ObjectId.createFromHexString(req.params.chatId),
    users: { $elemMatch: { user: req.user._id, isAchieve: false } },
  })
    .populate({
      path: 'users.user',
      select: '-password',
    })
    .populate({
      path: 'lastMessage',
      select: '-updatedAt',
      populate: {
        path: 'sender',
      },
    });

  if (!chat) {
    return next(new AppError('Chat not found', 400));
  }

  res.status(200).json({
    status: 'success',
    data: chat,
  });
});

exports.getAchievedChats = catchAsync(async (req, res, next) => {
  const chats = await Chat.find({
    users: { $elemMatch: { user: req.user._id, isAchieve: true } },
  })
    .populate({
      path: 'users.user',
      select: '-password',
    })
    .populate({
      path: 'lastMessage',
    });

  res.status(200).json({
    status: 'success',
    data: chats,
  });
});

exports.sendMessage = catchAsync(async (req, res, next) => {
  const { userId, message } = req.body;

  const receiveUser = await User.findById(userId);
  if (!receiveUser) {
    return next(new AppError('User not found'), 400);
  }

  let chat = await Chat.findOne({
    $or: [
      {
        $and: [
          { 'users.1.user': req.user._id },
          { 'users.0.user': receiveUser._id },
        ],
      },
      {
        $and: [
          { 'users.0.user': req.user._id }, 
          { 'users.1.user': receiveUser._id },
        ],
      },
    ],
  });
  if (!chat) {
    chat = await Chat.create({
      users: [{ user: req.user._id }, { user: receiveUser._id }],
    });
  }
  const newMessage = await Message.create({
    chat: chat._id,
    sender: req.user._id,
    content: message,
  });
  chat.lastMessage = newMessage;
  const savedChat = await chat.save();

  return res.status(200).json({
    status: 'success',
    data: { chat: savedChat, message: newMessage },
  });
});

exports.achieveChat = catchAsync(async (req, res, next) => {
  const { chatId, isAchieve = true } = req.body;
  const chat = await Chat.findOne({
    _id: mongoose.Types.ObjectId.createFromHexString(chatId),
    'users.user': { $in: [req.user._id] },
  });

  if (!chat) {
    return next(new AppError('Chat not found', 400));
  }

  const copyUsers = chat.users.map((v) => {
    if (String(v.user) === String(req.user._id)) {
      return { ...v, isAchieve: isAchieve };
    }
    return v;
  });

  chat.users = copyUsers;
  await chat.save();

  res.status(200).json({
    status: 'success',
  });
});

exports.getMessages = catchAsync(async (req, res, next) => {
  const pageNum = Number(req.query.pageNum) || 1;
  const recordsPerPage = Number(process.env.MESSAGES_PER_PAGE);

  const findCondition = {
    chat: mongoose.Types.ObjectId.createFromHexString(req.params.chatId),
  };

  const messages = await Message.find(findCondition)
    .skip(recordsPerPage * (pageNum - 1))
    .limit(recordsPerPage);

  const count = await Message.countDocuments(findCondition);

  res.status(200).json({
    status: 'success',
    data: messages,
    recordsPerPage,
    totalPage: Math.ceil(count / recordsPerPage),
    pageNum,
    totalRecords: count
  });
});
