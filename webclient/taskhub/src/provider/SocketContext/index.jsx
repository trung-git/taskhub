import { createContext, useState } from 'react';
import { io } from 'socket.io-client';
import { SOCKET_SERVER } from '../../base/config';

const SocketContext = createContext();

function SocketProvider({ children }) {
  const [socket, _] = useState(
    io(SOCKET_SERVER, {
      autoConnect: false,
    })
  );

  function emitUserLogin(userId) {
    socket.emit('user-login', userId);
  }

  function emitUserLogout(userId) {
    socket.emit('user-logout', userId);
  }

  const socketValue = {
    socket: socket,
    emitUserLogin,
    emitUserLogout
  };

  return (
    <SocketContext.Provider value={socketValue}>
      {children}
    </SocketContext.Provider>
  );
}

export { SocketContext, SocketProvider };
