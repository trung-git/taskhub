const useLogin = () => {
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
    //TODO nvigate tro login
  }

  return { getUserData, setUserData, logOut, setUserToken, getUserToken };
};

export default useLogin;
