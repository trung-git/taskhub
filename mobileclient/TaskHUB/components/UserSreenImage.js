import React, { useState, useContext } from 'react';
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
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AuthContext } from '../provider/AuthContext';
import { API_URL } from '../config/constans';

const UserSreenImage = () => {
  const { login } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isUpdateImg, setIsUpdateImg] = useState(false);

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    // const pickerResult = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   quality: 1,
    //   base64: true,
    //   allowsMultipleSelection: false,
    // });
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log('pickerResult', pickerResult?.canceled);

    if (!pickerResult.canceled) {
      const selectedImage = pickerResult.assets[0];
      setSelectedImage(selectedImage);
    }
  };
  console.log('selectedImage', selectedImage);

  const handUpdateImage = () => {
    console.log('selectedImage', selectedImage);
    if (selectedImage) {
      setIsUpdateImg(true);
      const formData = new FormData();
      formData.append('image', {
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.fileName,
      });
      console.log('formData', formData);

      axios
        .post(`${API_URL}/api/v1/user/update-profile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Đảm bảo đặt đúng header 'Content-Type' cho form data
          },
        })
        .then((response) => {
          console.log('signUpsuccess', response);
          // setSignUpData(initSignUpData);
          // login(response.data.data.user);
          console.log('Upload successful:', response?.data.data?.updatedUser);
          login(response?.data.data?.updatedUser);
          setIsUpdateImg(false);
          setModalVisible(false);
        })
        .catch((error) => {
          setIsUpdateImg(false);
          console.error(error);
          console.error('Error:', Object.keys(error), error.message);
          console.error(error?.config);
          console.error(error?.request);
          console.error(error?.response);
          Alert.alert('Cập nhật thất bại', error.message);
        });
    }
  };

  // axios.interceptors.request.use((request) => {
  //   console.log('Starting Request', JSON.stringify(request, null, 2));
  //   return request;
  // });

  // axios.interceptors.response.use((response) => {
  //   console.log('Response:', JSON.stringify(response, null, 2));
  //   return response;
  // });

  return (
    <View style={styles.container}>
      <Button
        style={{}}
        title="Cập nhật ảnh đại diện"
        onPress={() => setModalVisible(true)}
      />
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Button
              color="red"
              title="Đóng"
              disabled={isUpdateImg}
              onPress={() => setModalVisible(false)}
            />

            {isUpdateImg ? (
              <ActivityIndicator size="small" color="green" /> // Show ActivityIndicator when loading
            ) : (
              <Button
                disabled={!selectedImage || selectedImage?.fileSize >= 3000000}
                title="Cập nhật"
                onPress={handUpdateImage}
              />
            )}
          </View>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage.uri }}
              style={styles.avatarImage}
            />
          ) : (
            <View style={styles.avatarImage}></View>
          )}
          <Button title="Chọn hình" onPress={handleImagePicker} />
          <Text>(Kích thước tối đa 3MB)</Text>
          {selectedImage ? (
            <Text>
              (Hình đã chọn có kích thước{' '}
              {parseFloat(selectedImage?.fileSize / 1000000).toFixed(2)}MB)
            </Text>
          ) : null}
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
  selectText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatarImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#f0f0f0',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'green',
  },
  modalContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
    paddingTop: 40,
  },
});

export default UserSreenImage;
