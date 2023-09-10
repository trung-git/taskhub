import { createContext, useEffect } from 'react';
import socket from '../../base/socket';

const SocketContext = createContext();

function SocketProvider({ children }) {
  useEffect(() => {
    socket.on('server-emit-action-invitation-to-finder', (actionDetail) => {
      // TODO Push notification
      if (actionDetail?.action === 'discuss') {
        console.log(`${actionDetail.contract.tasker.firstName} đã chấp nhận lời mời cho công việc ${actionDetail.contract.taskTag.title}`);
      }
      else if (actionDetail?.action === 'rejected') {
        console.log(`${actionDetail.contract.tasker.firstName} đã từ chối lời mời cho công việc ${actionDetail.contract.taskTag.title}`);
      }
    })
  }, []);

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
