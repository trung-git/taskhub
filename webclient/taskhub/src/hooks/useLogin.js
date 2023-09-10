import { useContext } from 'react';
import { LoginContext } from '../provider/LoginContext';
import { SocketContext } from '../provider/SocketContext';

const useLogin = () => {
  const loginContext = useContext(LoginContext);
  const socketContext = useContext(SocketContext);

  function getUserData() {
    const user =
      JSON.parse(localStorage.getItem('users_taskhub_app_value')) ?? null;
    return user;
  }

  function setUserData(data) {
    localStorage.setItem('users_taskhub_app_value', JSON.stringify(data));
  }

  function getUserToken() {
    const token =
      JSON.parse(localStorage.getItem('users_taskhub_app_token')) ?? null;
    return token;
  }

  function setUserToken(data) {
    localStorage.setItem('users_taskhub_app_token', JSON.stringify(data));
  }

  function logOut() {
    localStorage.removeItem('users_taskhub_app_value');
    localStorage.removeItem('users_taskhub_app_token');

    socketContext.emitUserLogout(loginContext.currentUser._id);
    //TODO nvigate tro login
    loginContext.setCurrentUser(null);
    loginContext.setIsLogin(false);
  }

  return { getUserData, setUserData, logOut, setUserToken, getUserToken };
};

export default useLogin;
