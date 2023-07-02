import { createContext, useState } from 'react';

const SettingContext = createContext();

function SettingProvider({ children }) {
  // const users = (JSON.parse(localStorage.getItem('users')) ?? [])

  const initTheme = {
    themeDirection: '',
    mode: 'light',
    presetColor: '',
    fontFamily: '',
  };
  const [themeSetting, setThemeSetting] = useState(initTheme);
  //   const [currentID, setCurrentID] = useState();
  //   const [currentUser, setCurrentUser] = useState();

  const settingValue = {
    themeSetting,
    setThemeSetting,
    // currentID,
    // setCurrentID,
    // currentUser,
    // setCurrentUser,
  };

  return (
    <SettingContext.Provider value={settingValue}>
      {children}
    </SettingContext.Provider>
  );
}

export { SettingContext, SettingProvider };
