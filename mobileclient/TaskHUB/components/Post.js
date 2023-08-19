import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Button,
  KeyboardAvoidingView,
  PanResponder,
  SafeAreaView,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Divider from './Divider';
import ImageListPost from './ImageListPost';
import { AuthContext } from '../provider/AuthContext';
import axios from 'axios';

const Post = ({
  avatar,
  name,
  content,
  time,
  tag,
  candidate,
  postId,
  photo,
}) => {
  const { userData } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalReportVisible, setModalReportVisible] = useState(false);
  const [selfDescription, setSelfDescription] = useState('');
  const [reportReason, setReportReason] = useState('');
  const [salaryExpectation, setSalaryExpectation] = useState(0);
  const [keyboardOffset, setKeyboardOffset] = useState(8);
  // const [isSaved, setIsSaved] = useState(false);
  const [isApply, setApply] = useState(false);

  console.log('salaryExpectation', salaryExpectation);

  const handleApply = () => {
    setModalVisible(true);
  };

  const handleReport = () => {
    setModalReportVisible(true);
  };

  const onCancelRegister = () => {
    // Thực hiện xác thực đăng nhập
    axios
      .patch(
        `https://taskhub-mhm7.onrender.com/api/v1/post/unregister-candidate/${postId}`
      )
      .then((response) => {
        console.log('onCancelRegistersuccess', response);
        setApply(false);
      })
      .catch((error) => {
        // Xử lý lỗi đăng nhập
        console.error(error);
        console.error('Error:', Object.keys(error), error.message);
        console.error(error?.config);
        console.error(error?.request);
        console.error(error?.response);
        Alert.alert('Hủy đăng ký thất bại', error.message);
      });
  };

  const onSubmitRegister = (selfDescription, salaryExpectation) => {
    // Thực hiện xác thực đăng nhập
    axios
      .patch(
        `https://taskhub-mhm7.onrender.com/api/v1/post/register-candidate/${postId}`,
        {
          text: selfDescription,
          price: salaryExpectation,
        }
      )
      .then((response) => {
        console.log('onRegistersuccess', response);
        setModalVisible(false);
        setApply(true);
      })
      .catch((error) => {
        // Xử lý lỗi đăng nhập
        console.error(error);
        console.error('Error:', Object.keys(error), error.message);
        console.error(error?.config);
        console.error(error?.request);
        console.error(error?.response);
        Alert.alert('Hủy đăng ký thất bại', error.message);
      });
  };

  const handleUnApply = () => {
    Alert.alert(
      'Hủy đăng ký',
      'Bạn có chắc muốn hủy đăng ký cho công việc này?',
      [
        {
          text: 'Không',
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          onPress: () => {
            // call api cancel
            onCancelRegister();
          },
        },
      ]
    );
  };

  const handleCloseModalReport = () => {
    setModalReportVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleApplyDone = () => {
    onSubmitRegister(selfDescription, salaryExpectation);
  };

  const handleReportDone = () => {
    setModalReportVisible(false);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 10) {
        // Vuốt xuống hơn 50px
        setModalVisible(false); // Đóng modal
      }
    },
  });

  const handleKeyboardShow = () => {
    setKeyboardOffset(56); // Cập nhật vị trí của ô input khi bàn phím hiển thị
    // handleScrollToEnd();
  };

  const handleKeyboardHide = () => {
    setKeyboardOffset(8); // Đặt vị trí của ô input trở lại ban đầu khi bàn phím ẩn đi
  };

  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardHide
    );

    return () => {
      keyboardHideListener.remove();
    };
  }, []);

  useEffect(() => {
    console.log(
      'candidate',
      candidate?.map((_item) => {
        return _item?._id;
      })
    );
    console.log('userData', userData._id);
    if (
      candidate?.length > 0 &&
      candidate?.filter((record) => record?.user?._id == userData._id)?.length >
        0
    ) {
      const registerInfo = candidate?.find(
        (record) => record?.user?._id == userData._id
      );
      setApply(true);
      console.log('registerInfo', registerInfo?.price);
      setSelfDescription(registerInfo?.text);
      setSalaryExpectation(registerInfo?.price || 0);
    }
  }, [candidate, userData]);

  return (
    <View>
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.username}>{name}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
          <TouchableOpacity onPress={handleReport} style={styles.reportButton}>
            <Ionicons name="ios-flag-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <Text style={styles.content}>{content}</Text>
        {tag && (
          <View style={{ display: 'flex', flexDirection: 'row', my: 8 }}>
            <Text
              style={{
                color: 'green',
                backgroundColor: 'white',
                padding: 6,
                paddingHorizontal: 18,
                borderRadius: 16,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: 'green',
                fontWeight: 'bold',
                fontSize: 16,
                marginBottom: 9,
              }}
            >
              {tag}
            </Text>
          </View>
        )}
        {photo?.length > 0 && <ImageListPost images={photo} />}

        <View style={styles.actionButtons}>
          {isApply ? (
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleUnApply}
              >
                <Ionicons name="close" size={24} color="red" />
                <Text style={{ color: 'red', fontWeight: 'bold' }}>
                  Hủy đăng ký
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleApply}
              >
                <Ionicons name="share" size={24} color="green" />
                <Text style={{ color: 'green', fontWeight: 'bold' }}>
                  Đăng ký lại
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.actionButton} onPress={handleApply}>
              <Ionicons name="share-outline" size={24} color="gray" />
              <Text style={styles.buttonApplyText}>Đăng ký</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        {...panResponder.panHandlers}
      >
        <KeyboardAvoidingView
          style={{
            flex: 1,
            paddingHorizontal: 16,
            backgroundColor: '#fff',
            marginBottom: keyboardOffset,
          }}
          behavior="padding"
          enabled
        >
          <ScrollView>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Đăng ký cho công việc này !</Text>
              <View style={styles.postContainer}>
                <View style={styles.postHeader}>
                  <Image source={{ uri: avatar }} style={styles.avatar} />
                  <View style={styles.userInfo}>
                    <Text style={styles.username}>{name}</Text>
                    <Text style={styles.time}>{time}</Text>
                  </View>
                </View>
                <Text style={styles.content}>{content}</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Mô tả bản thân đi bro</Text>
                <TextInput
                  style={[styles.textInput, styles.selfDescriptionInput]}
                  multiline={true}
                  numberOfLines={4}
                  value={selfDescription}
                  onChangeText={(text) => setSelfDescription(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Mức lương mong muốn (VND)</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  value={salaryExpectation
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  onChangeText={(text) =>
                    setSalaryExpectation(text.replace(/\./g, ''))
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 16,
                  backgroundColor: 'white',
                }}
              >
                <TouchableOpacity
                  style={[styles.button, styles.closeButton]}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.buttonText}>Đóng</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.submitButton]}
                  onPress={handleApplyDone}
                >
                  <Text style={styles.buttonText}>Đăng ký</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        visible={isModalReportVisible}
        animationType="slide"
        {...panResponder.panHandlers}
      >
        <KeyboardAvoidingView
          style={{
            flex: 1,
            paddingHorizontal: 16,
            backgroundColor: '#fff',
            marginBottom: keyboardOffset,
          }}
          behavior="padding"
          enabled
        >
          <ScrollView>
            <View style={styles.modalContainer}>
              <Text style={{ ...styles.modalTitle, color: 'red' }}>
                Báo cáo công việc này !
              </Text>
              <View style={styles.postContainer}>
                <View style={styles.postHeader}>
                  <Image source={{ uri: avatar }} style={styles.avatar} />
                  <View style={styles.userInfo}>
                    <Text style={styles.username}>{name}</Text>
                    <Text style={styles.time}>{time}</Text>
                  </View>
                </View>
                <Text style={styles.content}>{content}</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Lý do: </Text>
                <TextInput
                  style={[styles.textInput, styles.selfDescriptionInput]}
                  multiline={true}
                  numberOfLines={4}
                  value={reportReason}
                  onChangeText={(text) => setReportReason(text)}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 16,
                  backgroundColor: 'white',
                }}
              >
                <TouchableOpacity
                  style={[styles.button, styles.closeButton]}
                  onPress={handleCloseModalReport}
                >
                  <Text style={styles.buttonText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.submitButton]}
                  onPress={handleReportDone}
                >
                  <Text style={styles.buttonText}>Báo cáo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  postContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  time: {
    color: 'gray',
    fontSize: 12,
  },
  reportButton: {
    marginLeft: 'auto',
  },
  content: {
    marginBottom: 8,
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 8,
    // borderColor: 'green',
    // borderWidth: 1,
    // borderRadius: 5,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 32,
    paddingTop: Platform.OS === 'ios' ? 54 : 0,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 32,
    color: 'green',
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  selfDescriptionInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingVertical: 8,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  button: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginHorizontal: 8,
  },
  closeButton: {
    backgroundColor: 'red',
  },
  submitButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Post;
