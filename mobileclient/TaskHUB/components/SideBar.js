import React, { useState, useContext } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Divider from './Divider';
import { AuthContext } from '../provider/AuthContext';

const SideBar = ({ isSideBarOpen, closeSideBar }) => {
  const { logout } = useContext(AuthContext);
  const toggleModal = () => {
    closeSideBar && closeSideBar();
  };

  const handleOutsidePress = () => {
    if (isSideBarOpen) {
      toggleModal();
    }
  };

  const handleConfirm = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn thực hiện hành động này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          onPress: () => handleLogOut(),
        },
      ]
    );
  };

  const handleLogOut = () => {
    logout();
    toggleModal();
  }

  const windowHeight = Dimensions.get('window').height;
  const modalHeight = windowHeight * 0.5; // Chiều cao bằng nửa màn hình

  return (
    <Modal visible={isSideBarOpen} animationType="slide" transparent>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={handleOutsidePress}>
        <SafeAreaView style={[styles.safeContainer, { height: modalHeight }]}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>-</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={toggleModal}>
              <Ionicons
                name="bookmark-outline"
                size={24}
                style={styles.iconSideBar}
              />
              <Text style={styles.modalCloseButtonText}>Xem các công việc đã đăng ký</Text>
            </TouchableOpacity>
            <Divider direction="horizontal" color="gray" height={1} />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={toggleModal}>
              <Ionicons
                name="settings-outline"
                size={24}
                style={styles.iconSideBar}
              />
              <Text style={styles.modalCloseButtonText}>Cài đặt</Text>
            </TouchableOpacity>
            <Divider direction="horizontal" color="gray" height={1} />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={handleConfirm}>
              <Ionicons
                name="log-out-outline"
                size={24}
                style={{ ...styles.iconSideBar, color: 'red' }}
              />
              <Text style={{ ...styles.modalCloseButtonText, color: 'red' }}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền mờ
    height: '50%',
  },
  safeContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    maxHeight: '100%',
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'green',
    textAlign: 'center',
  },
  modalCloseButton: {
    // backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSideBar: {
    marginRight: 8
  },
  modalCloseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SideBar;
