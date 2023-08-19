import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isFetchingUserData, setIsFetchingUserData] = useState(true);

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        const parseVal = JSON.parse(value);
        setUserData(parseVal)
        setLoggedIn(true)
        setIsFetchingUserData(false)
        return value;
      } else {
        setIsFetchingUserData(false)
        return;
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
      setIsFetchingUserData(false)
      return;
    }
  };

  useEffect(() => {
    getData('userData');
  }, []);

  const storeData = async (key, value) => {
    try {
      const stringVal = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringVal);
    } catch (error) {
      console.log('Error storing data:', error);
    }
  };

  const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log('Error removing data:', error);
    }
  };

  const login = (data) => {
    // Xử lý logic đăng nhập thành công
    setLoggedIn(true);
    setUserData(data);
    storeData('userData', data);
  };

  const logout = () => {
    // Xử lý logic đăng xuất
    setLoggedIn(false);
    removeData('userData');
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, userData, setUserData, isFetchingUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
