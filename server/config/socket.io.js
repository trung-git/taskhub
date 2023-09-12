const { Server } = require('socket.io');
const Chat = require('../models/chatModel');
const mongoose = require('mongoose');

const createSocketServer = (server) => {
  let onlineUsers = [];
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('Socket connect',socket.id);
    socket.on('user-login', async (userId) => {
      try {
        onlineUsers = onlineUsers.filter((v) => v?.socketId !== socket.id);
        onlineUsers.push({ userId, socketId: socket.id });
        io.sockets.emit('list-user-online', onlineUsers);
        console.log('Login - Online User', onlineUsers);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('user-logout', (userId) => {
      onlineUsers = onlineUsers.filter((v) => v?.userId !== userId);
      io.sockets.emit('list-user-online', onlineUsers);
      console.log('Logout - Online User', onlineUsers);
    });

    socket.on('user-send-message', (userReceiveMessageInfo, messageInfo) => {
      const userReceiveMessageInOnlineList = onlineUsers.filter(v => v.userId === userReceiveMessageInfo.id);
      console.log('user-send-message', userReceiveMessageInOnlineList);
      if (userReceiveMessageInOnlineList.length > 0) {
        userReceiveMessageInOnlineList.forEach(u => {
          io.to(u.socketId).emit('server-emit-message', messageInfo, userReceiveMessageInfo.name);
        })
      }
    })

    socket.on('finder-send-invitation', (toUserId, contractDetail) => {
      const userReceive = onlineUsers.filter(v => v.userId === toUserId);
      if (userReceive.length > 0) {
        userReceive.forEach(u => {
          io.to(u.socketId).emit('server-emit-invitation-to-tasker', contractDetail);
        })
      }
    })

    socket.on('tasker-send-action-invitation', (toUserId, actionDetail) => {
      const userReceive = onlineUsers.filter(v => v.userId === toUserId);
      if (userReceive.length > 0) {
        userReceive.forEach(u => {
          io.to(u.socketId).emit('server-emit-action-invitation-to-finder', actionDetail);
        })
      }
    })

    socket.on('finder-update-contract', (toUserId, contractDetail) => {
      const userReceive = onlineUsers.filter(v => v.userId === toUserId);
      if (userReceive.length > 0) {
        userReceive.forEach(u => {
          io.to(u.socketId).emit('server-emit-update-contract', contractDetail);
        })
      }
    })

    socket.on('tasker-update-contract-state', (toUserId, contractDetail) => {
      const userReceive = onlineUsers.filter(v => v.userId === toUserId);
      if (userReceive.length > 0) {
        userReceive.forEach(u => {
          io.to(u.socketId).emit('server-emit-update-contract-state', contractDetail);
        })
      }
    })

    socket.on('disconnect', () => {
      onlineUsers = onlineUsers.filter((v) => v?.socketId !== socket.id);
      io.sockets.emit('list-user-online', onlineUsers);
      console.log('Disconnect - Online User', onlineUsers);
    });
  });
};

module.exports = createSocketServer;
