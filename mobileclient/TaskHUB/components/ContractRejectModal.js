import React, { useState, useContext } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Divider from './Divider';
import { AuthContext } from '../provider/AuthContext';

const ContractRejectModal = ({
  isRejectOpen,
  closeReject,
  taskId,
  onReject,
}) => {
  const toggleModal = () => {
    closeReject && closeReject();
  };

  const handleOutsidePress = () => {
    closeReject && closeReject();
  };

  const windowHeight = Dimensions.get('window').height;
  const modalHeight = windowHeight * 0.5; // Chiều cao bằng nửa màn hình

  return (
    <Modal visible={isRejectOpen} animationType="slide" transparent>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={handleOutsidePress}
      >
        <SafeAreaView style={[styles.safeContainer, { height: modalHeight }]}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Vui lòng chọn lý do</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={toggleModal}
            >
              <Text style={styles.modalCloseButtonText}>
                Thời gian không phù hợp
              </Text>
            </TouchableOpacity>
            <Divider direction="horizontal" color="gray" height={1} />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={toggleModal}
            >
              <Text style={styles.modalCloseButtonText}>Địa chỉ quá xa</Text>
            </TouchableOpacity>
            <Divider direction="horizontal" color="gray" height={1} />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={toggleModal}
            >
              <Text style={styles.modalCloseButtonText}>
                Giá cả không hợp lý
              </Text>
            </TouchableOpacity>
            <Divider direction="horizontal" color="gray" height={1} />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={toggleModal}
            >
              <Text style={styles.modalCloseButtonText}>Người đặt nhầm</Text>
            </TouchableOpacity>
            <Divider direction="horizontal" color="gray" height={1} />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={toggleModal}
            >
              <Text style={{ ...styles.modalCloseButtonText, color: 'red' }}>
                Hủy
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
    </Modal>
  );
};

export default ContractRejectModal;

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
    borderTopColor: 'green',
    borderWidth: '1px',
    borderStyle: 'solid',
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
    marginRight: 8,
  },
  modalCloseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
