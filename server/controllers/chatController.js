const mongoose = require('mongoose');
const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

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
  const { chatId, message } = req.body;

  let chat = await Chat.findById(chatId);
  if (!chat) {
    return next(new AppError('Chat not found'), 400);
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
  const { messageId } = req.query;
  const recordsPerPage = Number(process.env.MESSAGES_PER_PAGE);

  if (messageId) {
    const specificMessage = await Message.findById(messageId);
    if (!specificMessage) {
      return next(new AppError('Invalid message', 400));
    }

    const messages = await Message.find({
      chat: mongoose.Types.ObjectId.createFromHexString(req.params.chatId),
      createdAt: { $lt: specificMessage.createdAt },
    })
      .sort({ createdAt: 'desc' })
      .limit(recordsPerPage);

    res.status(200).json({
      status: 'success',
      data: messages.reverse(),
      length: messages.length,
      recordsPerPage,
    });
  } else {
    const messages = await Message.find({
      chat: mongoose.Types.ObjectId.createFromHexString(req.params.chatId),
    })
      .sort({ createdAt: 'desc' })
      .limit(recordsPerPage);

    res.status(200).json({
      status: 'success',
      data: messages.reverse(),
      length: messages.length,
      recordsPerPage,
    });
  }
});
