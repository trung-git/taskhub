import { createContext, useContext, useEffect, useState } from 'react';
import useLogin from '../../hooks/useLogin';
import { SocketContext } from '../SocketContext';
import axios from 'axios';
import { API_URL } from '../../base/config';

const LoginContext = createContext();

function LoginProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [currentID, setCurrentID] = useState();
  const [currentUser, setCurrentUser] = useState();

  const { emitUserLogin } = useContext(SocketContext);

  const { getUserData, logOut, getUserToken } = useLogin();

  const token = getUserToken();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleCheckMe = () => {
    axios
      .get(`${API_URL}api/v1/user/me`, config)
      .then((response) => {
        initAuth();
      })
      .catch((error) => {
        logOut();
      });
  };

  const initAuth = () => {
    const userData = getUserData();
    if (userData) {
      setIsLogin(true);
      setCurrentUser(userData);

      emitUserLogin(userData._id);
    } else {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    handleCheckMe();
  }, []);

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
