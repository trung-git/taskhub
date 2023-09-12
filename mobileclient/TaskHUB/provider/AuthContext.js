import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config/constans';
import axios from 'axios';
import socket from '../config/socket';
import { schedulePushNotification } from '../hooks/useNotification';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import locToString from '../config/locToString';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isFetchingUserData, setIsFetchingUserData] = useState(true);

  const [isInChat, setIsInChat] = useState(false);
  const [currentTaskerInContract, setCurrentTaskerInContract] = useState('');

  const [notifications, setNotifications] = useState([]);
  const [shouldClearNotifications, setShouldClearNotifications] =
    useState(false);
  const { t } = useTranslation();

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        const parseVal = JSON.parse(value);
        setUserData(parseVal);
        socket.emit('user-login', parseVal._id);
        setLoggedIn(true);
        setIsFetchingUserData(false);
        return value;
      } else {
        setIsFetchingUserData(false);
        return;
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
      setIsFetchingUserData(false);
      return;
    }
  };

  const handleLogOut = () => {
    axios
      .get(`${API_URL}/api/v1/user/logout`)
      .then((response) => {
        // removeData('userData');
      })
      .catch((error) => {
        // console.log('error', error);
      });
  };

  const handleCheckMe = () => {
    axios
      .get(`${API_URL}/api/v1/user/me`)
      .then((response) => {
        // console.log('responseCheckme', response);
        getData();
        // setIsFetchingUserData(false);
      })
      .catch((error) => {
        // Hết hạn
        // console.log('responseCheckmeError', error);
        setLoggedIn(false);
        removeData('userData');
        setIsFetchingUserData(false);
      });
  };

  useEffect(() => {
    // setIsFetchingUserData(true);
    handleCheckMe();
    // getData();
  }, []);
  useEffect(() => {
    socket.on('server-emit-message', (messageInfo, senderName) => {
      setNotifications((prev) => [...prev, { messageInfo, senderName }]);
    });
  }, []);

  useEffect(() => {
    if (notifications.length > 0) {
      if (!isInChat || (isInChat && currentTaskerInContract !== userData._id)) {
        // TODO Push notification
        notifications.forEach((v) => {
          // console.log(`Bạn nhận được một thông báo từ ${v.senderName} với nội dung là: ${v.messageInfo.content}`);
          // schedulePushNotification
          schedulePushNotification(
            `[${v.senderName}] - Tin nhắn mới`,
            `${v.messageInfo.content}`
          );
        });
      }
      setShouldClearNotifications(true);
    }
  }, [notifications]);
  useEffect(() => {
    if (shouldClearNotifications) {
      setNotifications([]);
      setShouldClearNotifications(false);
    }
  }, [shouldClearNotifications]);

  useEffect(() => {
    socket.on('server-emit-invitation-to-tasker', (contractDetail) => {
      schedulePushNotification(
        `[${t(contractDetail.taskTag.langKey)}] - Lời mời mới`,
        `${locToString(contractDetail.workLocation, false)} ${dayjs(
          contractDetail.workTime.from
        ).format('HH:mm DD-MM-YYYY')}`
      );
    });
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

    socket.emit('user-login', data._id);
  };

  const logout = () => {
    // Xử lý logic đăng xuất
    setLoggedIn(false);
    removeData('userData');
    socket.emit('user-logout', userData._id);
    handleLogOut();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        userData,
        setUserData,
        isFetchingUserData,
        isInChat,
        setIsInChat,
        setCurrentTaskerInContract,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
