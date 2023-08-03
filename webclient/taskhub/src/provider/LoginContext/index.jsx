import { createContext, useEffect, useState } from 'react';
import useLogin from '../../hooks/useLogin';

const LoginContext = createContext();

function LoginProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [currentID, setCurrentID] = useState();
  const [currentUser, setCurrentUser] = useState();

  const { getUserData } = useLogin();

  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
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
