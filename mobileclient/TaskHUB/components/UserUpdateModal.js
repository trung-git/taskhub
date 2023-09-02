import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  Modal,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { AuthContext } from '../provider/AuthContext';
import { API_URL } from '../config/constans';

const UserUpdateModal = ({ field, isOpenEditModal, onClose }) => {
  const { login } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [fieldValue, setFieldValue] = useState('');

  console.log('fieldValue', fieldValue);

  const Component = field?.component;

  useEffect(() => {
    if (isOpenEditModal) {
      setModalVisible(isOpenEditModal);
    }
  }, [isOpenEditModal]);

  useEffect(() => {
    setFieldValue(field?.editValue ? field?.editValue : field?.value);
  }, [field]);

  console.log('field', field);

  const handUpdate = () => {
    setIsUpdate(true);
    axios
      .post(`${API_URL}/api/v1/user/update-profile`, {
        [field?.name]:
          field?.name === 'workLocation'
            ? fieldValue?.map((val) => val?._id)
            : field?.name === 'taskTag'
            ? fieldValue?.map((val) => {
                return {
                  price: val?.price,
                  taskInfo: val?.taskInfo?._id,
                };
              })
            : fieldValue,
      })
      .then((response) => {
        console.log('signUpsuccess', response);
        // setSignUpData(initSignUpData);
        // login(response.data.data.user);
        console.log('Upload successful:', response?.data.data?.updatedUser);
        login(response?.data.data?.updatedUser);
        setIsUpdate(false);
        setModalVisible(false);
        onClose && onClose();
      })
      .catch((error) => {
        setIsUpdate(false);
        console.error(error);
        console.error('Error:', Object.keys(error), error.message);
        console.error(error?.config);
        console.error(error?.request);
        console.error(error?.response);
        Alert.alert('Cập nhật thất bại', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <View
              style={{ flex: 2, display: 'flex', justifyContent: 'flex-start' }}
            >
              <Button
                color="red"
                title="Đóng"
                disabled={isUpdate}
                onPress={() => {
                  setModalVisible(false);
                  onClose && onClose();
                }}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 4,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                {field?.label}
              </Text>
            </View>
            <View
              style={{ flex: 2, display: 'flex', justifyContent: 'flex-end' }}
            >
              {isUpdate ? (
                <ActivityIndicator size="small" color="green" /> // Show ActivityIndicator when loading
              ) : (
                <Button
                  disabled={false}
                  title="Cập nhật"
                  onPress={handUpdate}
                />
              )}
            </View>
          </View>
          <View style={{ marginTop: 16, width: '100%' }}>
            {Component && (
              <Component
                value={fieldValue}
                onChange={(val) => setFieldValue(val)}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
    paddingTop: 50,
  },
});

export default UserUpdateModal;
