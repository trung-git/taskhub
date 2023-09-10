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

  function emitFinderSendInvitation(toUserId, contractDetail) {
    socket.emit('finder-send-invitation', toUserId, contractDetail)
  }

  const socketValue = {
    emitUserLogin,
    emitUserLogout,
    emitUserSendMessage,
    emitFinderSendInvitation
  };

  return (
    <SocketContext.Provider value={socketValue}>
      {children}
    </SocketContext.Provider>
  );
}

export { SocketContext, SocketProvider };
