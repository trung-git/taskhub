const { Server } = require('socket.io');
const Chat = require('../models/chatModel');
const mongoose = require('mongoose');

const createSocketServer = (server) => {
  let onlineUsers = [];
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'https://taskhub-pro.netlify.app', '192.168.137.112:8081'],
    },
  });

  io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('user-login', async (userId) => {
      try {
        console.log({userId});
        onlineUsers = onlineUsers.filter((v) => v?.socketId !== socket.id);
        onlineUsers.push({ userId, socketId: socket.id });
        socket.broadcast.emit('get-users-online', onlineUsers);

        const chats = await Chat.find({
          users: {
            $elemMatch: {
              user: mongoose.Types.ObjectId.createFromHexString(userId),
            },
          },
        });

        const chatIds = chats.map((chat) => chat._id);
        chatIds.forEach((id) => {
          socket.join(String(id));
        });
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('user-logout', (userId) => {
      onlineUsers = onlineUsers.filter((v) => v?.userId !== userId);
      socket.broadcast.emit('get-users-online', onlineUsers);
    });

    socket.on('disconnect', () => {
      onlineUsers = onlineUsers.filter((v) => v?.socketId !== socket.id);
      socket.broadcast.emit('get-users-online', onlineUsers);
    });
  });
};

module.exports = createSocketServer;
