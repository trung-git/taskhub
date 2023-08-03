const useLogin = () => {
  function getUserData() {
    const user =
      JSON.parse(localStorage.getItem('users_taskhub_app_value')) ?? null;
    return user;
  }

  function setUserData(data) {
    localStorage.setItem('users_taskhub_app_value', JSON.stringify(data));
  }

  function logOut() {
    localStorage.removeItem('users_taskhub_app_value');
  }

  return { getUserData, setUserData, logOut };
};

export default useLogin;
