import { createContext } from 'react';
import socket from '../../base/socket';

const SocketContext = createContext();

function SocketProvider({ children }) {
  function emitUserLogin(userId) {
    socket.emit('user-login', userId);
  }

  function emitUserLogout(userId) {
    socket.emit('user-logout', userId);
  }

  function emitUserSendMessage(userReceiveMessageInfo, messageInfo) {
    socket.emit('user-send-message', userReceiveMessageInfo, messageInfo);
  }

  const socketValue = {
    emitUserLogin,
    emitUserLogout,
    emitUserSendMessage
  };

  return (
    <SocketContext.Provider value={socketValue}>
      {children}
    </SocketContext.Provider>
  );
}

export { SocketContext, SocketProvider };
