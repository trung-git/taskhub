import { createContext, useContext, useEffect, useState } from 'react';
import useLogin from '../../hooks/useLogin';
import { SocketContext } from '../SocketContext';

const LoginContext = createContext();

function LoginProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [currentID, setCurrentID] = useState();
  const [currentUser, setCurrentUser] = useState();

  const { socket, emitUserLogin } = useContext(SocketContext);

  const { getUserData } = useLogin();

  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      setIsLogin(true);
      setCurrentUser(userData);

      socket && socket.connect();
      emitUserLogin(userData._id);
    } else {
      setIsLogin(false);
    }
  }, []);

  // useEffect(()=>{
  //   socket.on("get-users-online", (data) => {
  //     console.log("DATA nè :", data);
  //   })
  // }, [])
  const loginValue = {
    isLogin,
    setIsLogin,
    currentID,
    setCurrentID,
    currentUser,
    setCurrentUser,
  };

  return (
    <LoginContext.Provider value={loginValue}>{children}</LoginContext.Provider>
  );
}

export { LoginContext, LoginProvider };
