const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getChats = catchAsync(async (req, res, next) => {
  const chats = await Chat.find({
    users: { $elemMatch: { $eq: req.user._id } },
  })
    .populate({
      path: 'users',
      select: '-password',
    })
    .populate({
      path: 'messages.sender',
      select: '-password',
    });

  res.status(200).json({
    status: 'success',
    data: chats,
  });
});

exports.getChatById = catchAsync(async (req, res, next) => {
  const chat = await Chat.findOne({
    _id: req.params.chatId,
    users: { $elemMatch: { $eq: req.user._id } },
  })
    .populate({
      path: 'users',
      select: '-password',
    })
    .populate({
      path: 'messages.sender',
      select: '-password',
    });

  if (!chat) {
    return next(new AppError('Chat not found', 400));
  }

  res.status(200).json({
    status: 'success',
    data: chat,
  });
});

exports.createChat = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.body.user);
  if (!user) {
    return next(new AppError('User not found', 400));
  }
  const chat = await Chat.create({
    chatName: `${req.user.firstName} and ${user.firstName}`,
    users: [req.user._id, user._id],
  });

  const finalChat = await chat.populate({
    path: 'users',
    select: '-password',
  });

  res.status(200).json({
    status: 'success',
    data: finalChat,
  });
});

exports.sendMessage = catchAsync(async (req, res, next) => {
  const { chatId, userId, message } = req.body;
  const chat = await Chat.findOne({
    _id: chatId,
    users: { $elemMatch: { $eq: userId } },
  });

  if (!chat) {
    return next(new AppError('Chat not found', 400));
  }
  const mes = { sender: userId, content: message, createAt: Date.now() };
  chat.messages = [...chat.messages, mes];
  chat.lastMessage = mes;

  await chat.save();

  res.status(200).json({
    status: 'success',
    data: chat,
  });
});

exports.deleteChat = catchAsync(async (req, res, next) => {
  const result = await Chat.findOneAndDelete({
    _id: req.params.chatId,
    users: { $elemMatch: { $eq: req.user._id } },
  });

  if (!result) {
    return next(new AppError('Chat not found', 400));
  }

  res.status(200).json({
    status: 'success',
    data: result,
  });
});
