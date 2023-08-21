import { createContext, useState } from 'react';
import { io } from 'socket.io-client';
import { SOCKET_SERVER } from '../../base/config';

const SocketContext = createContext();

function SocketProvider({ children }) {
  const [socket] = useState(
    io(SOCKET_SERVER, {
      autoConnect: false,
    })
  );

  socket.connect();

  function emitUserLogin(userId) {
    socket.emit('user-login', userId);
  }

  function emitUserLogout(userId) {
    console.log("LOGOUT");
    socket.emit('user-logout', userId);
  }

  const socketValue = {
    socket: socket,
    emitUserLogin,
    emitUserLogout,
  };

  return (
    <SocketContext.Provider value={socketValue}>
      {children}
    </SocketContext.Provider>
  );
}

export { SocketContext, SocketProvider };
