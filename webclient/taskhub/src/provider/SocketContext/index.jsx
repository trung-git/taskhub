import { createContext, useEffect } from 'react';
import socket from '../../base/socket';
import useToastify from '../../hooks/useToastify';
import { useTranslation } from 'react-i18next';

const SocketContext = createContext();

function SocketProvider({ children }) {
  const { t } = useTranslation();
  const { toastLinkInfo } = useToastify();
  useEffect(() => {
    socket.on('server-emit-action-invitation-to-finder', (actionDetail) => {
      if (actionDetail?.action === 'discuss') {
        const message = `${
          actionDetail.contract.tasker.firstName
        } đã chấp nhận lời mời cho công việc ${t(
          actionDetail.contract.taskTag.langKey
        )}`;
        toastLinkInfo(message, `/tasklist/${actionDetail.contract._id}`);
      } else if (actionDetail?.action === 'rejected') {
        const message = `${
          actionDetail.contract.tasker.firstName
        } đã từ chối lời mời cho công việc ${t(
          actionDetail.contract.taskTag.langKey
        )}`;
        toastLinkInfo(message, `/tasklist/${actionDetail.contract._id}`);
      }
    });
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
    socket.emit('finder-send-invitation', toUserId, contractDetail);
  }

  const socketValue = {
    emitUserLogin,
    emitUserLogout,
    emitUserSendMessage,
    emitFinderSendInvitation,
  };

  return (
    <SocketContext.Provider value={socketValue}>
      {children}
    </SocketContext.Provider>
  );
}

export { SocketContext, SocketProvider };
