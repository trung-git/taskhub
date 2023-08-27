import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  Keyboard,
  ActivityIndicator,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../provider/AuthContext';
import axios from 'axios';
import AddressPicker from './AddressPicker';
import SubAddressPicker from './SubAddressPicker';
import TaskTagPicker from './TaskTagPicker';
import DateTimePicker from './DateTimePicker';
import GenderPicker from './GenderPicker';
import DatePick from './DatePick';
import { API_URL } from '../config/constans';

const initSignUpData = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  dayOfBirth: '2000-01-01',
  workLocation: '',
};

const LoginScreen = () => {
  const { login } = useContext(AuthContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(8);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUpData, setSignUpData] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isFetchingLogin, setIsFetchingLogin] = useState(false);

  const [signUpFormValid, setSignUpFormValid] = useState(false);
  const [signUpFormError, setSignUpFormError] = useState('');

  console.log('signUpData', signUpData);

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
  };

  useEffect(() => {
    if (activeStep == 0) {
      console.log('signUpData', signUpData);
      setSignUpFormValid(
        Boolean(signUpData?.workLocation) && Boolean(signUpData?.taskTag)
      );
    } else if (activeStep == 1) {
      console.log('signUpDatastep2', signUpData);
      setSignUpFormValid(
        Boolean(signUpData?.lastName) &&
          Boolean(signUpData?.firstName) &&
          Boolean(signUpData?.gender) &&
          Boolean(signUpData?.dayOfBirth)
      );
    } else if (activeStep == 2) {
      setSignUpFormValid(
        Boolean(signUpData?.username) &&
          Boolean(signUpData?.password && signUpData?.password?.length >= 8) &&
          Boolean(signUpData?.confirmPassword) &&
          Boolean(signUpData?.confirmPassword === signUpData?.password) &&
          isValidEmail(signUpData?.email)
      );
    }
  }, [signUpData]);

  useEffect(() => {
    setSignUpFormValid(false);
  }, [activeStep]);

  const handleSignUpForm = (key, val) => {
    console.log('handleSignUpForm', key, val);
    setSignUpData((prev) => {
      return {
        ...prev,
        [key]: val,
      };
    });
  };

  const handleLogin = () => {
    // Thực hiện xác thực đăng nhập
    if (username !== '' && password !== '') {
      // call api login
      setIsFetchingLogin(true);
      axios
        .post(`${API_URL}/api/v1/user/login`, {
          username,
          password,
          role: 'Tasker',
        })
        .then((response) => {
          // Xử lý đăng nhập thành công
          setIsFetchingLogin(false);
          console.log(response);
          login(response.data.data.user);
        })
        .catch((error) => {
          // Xử lý lỗi đăng nhập
          setIsFetchingLogin(false);
          console.error(error.message);
          Alert.alert(
            'Đăng nhập thất bại',
            'Tài khoản hoặc mật khẩu không chính xác'
          );
        });
    } else {
      Alert.alert('Đăng nhập thất bại', 'Vui lòng nhập tài khoản và mật khẩu');
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 10) {
        setModalVisible(false); // Đóng modal
      }
    },
  });

  const handleKeyboardShow = () => {
    setKeyboardOffset(56); // Cập nhật vị trí của ô input khi bàn phím hiển thị
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

  const handleSignUpNext = () => {
    setActiveStep((prev) => Number(prev) + 1);
    if (activeStep > 2) setActiveStep(2);
  };

  const handleSignUpBack = () => {
    setActiveStep((prev) => Number(prev) - 1);
    if (activeStep < 0) setActiveStep(0);
  };

  const onSubmitSignUp = (signUpFormData) => {
    // Thực hiện xác thực đăng nhập
    axios
      .post(`${API_URL}/api/v1/user/signup`, {
        ...signUpFormData,
      })
      .then((response) => {
        // Xử lý đăng nhập thành công
        // setIsFetchingLogin(false);
        console.log('signUpsuccess', response);
        setSignUpData(initSignUpData);
        // login(response.data.data.user);
      })
      .catch((error) => {
        // Xử lý lỗi đăng nhập
        setIsFetchingLogin(false);
        console.error(error);
        console.error('Error:', Object.keys(error), error.message);
        console.error(error?.config);
        console.error(error?.request);
        console.error(error?.response);

        Alert.alert('Đăng ký thất bại', error.message);
      });
  };

  // axios.interceptors.request.use((request) => {
  //   console.log('Starting Request', JSON.stringify(request, null, 2));
  //   return request;
  // });

  // axios.interceptors.response.use((response) => {
  //   console.log('Response:', JSON.stringify(response, null, 2));
  //   return response;
  // });

  const handleSignUp = () => {
    console.log('signUpDataOnSubMit', signUpData);

    const signUpVal = {
      username: signUpData?.username,
      firstName: signUpData?.firstName,
      lastName: signUpData?.lastName,
      dateOfBirth: signUpData?.dayOfBirth,
      email: signUpData?.email,
      gender: signUpData?.gender,
      password: signUpData?.password,
      workLocation: signUpData?.workLocation?._id,
      taskTag: signUpData?.taskTag?._id,
      role: 'Tasker',
    };

    console.log('signUpVal', signUpVal);

    onSubmitSignUp(signUpVal);

    // success
    // setSignUpData(initSignUpData);
  };

  console.log('activeStep', activeStep);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isFetchingLogin ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <React.Fragment>
          <KeyboardAvoidingView
            style={{
              flex: 1,
              paddingHorizontal: 0,
              backgroundColor: '#fff',
              marginBottom: keyboardOffset,
            }}
            behavior="padding"
            enabled
          >
            <ScrollView>
              <View style={styles.container}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Đăng nhập vào TaskHUB</Text>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Tên đăng nhập</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="username"
                      placeholderTextColor="gray"
                      value={username}
                      onChangeText={(text) => setUsername(text)}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Mật khẩu</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="password"
                      value={password}
                      placeholderTextColor="gray"
                      onChangeText={(text) => setPassword(text)}
                      secureTextEntry
                      textContentType="oneTimeCode"
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 16,
                      width: '100%',
                      paddingHorizontal: 16,
                    }}
                  >
                    <TouchableOpacity
                      style={[styles.button, styles.submitButton]}
                      onPress={handleLogin}
                    >
                      <Text style={styles.buttonText}>Đăng nhập</Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 24,
                      width: '100%',
                      paddingHorizontal: 16,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                      onPress={() => setModalVisible(true)}
                    >
                      <Text
                        style={{
                          color: 'red',
                          textDecorationLine: 'underline',
                          fontSize: 16,
                        }}
                      >
                        Quên mật khẩu ?
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                      onPress={() => setModalVisible(true)}
                    >
                      <Text
                        style={{
                          color: 'green',
                          fontSize: 16,
                        }}
                      >
                        Đăng ký tài khoản
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
          <Modal
            visible={isModalVisible}
            animationType="slide"
            {...panResponder.panHandlers}
          >
            <KeyboardAvoidingView
              style={{
                flex: 1,
                paddingHorizontal: 0,
                backgroundColor: '#fff',
                marginBottom: keyboardOffset,
              }}
              behavior="padding"
              enabled
            >
              <ScrollView>
                <View style={styles.signUpmodalContainer}>
                  <Text style={styles.modalTitle}>Đăng ký tài khoản</Text>

                  <View
                    display={activeStep != 0 ? 'none' : undefined}
                    style={styles.inputContainer}
                  >
                    <Text style={styles.inputLabel}>
                      Chọn thành phố <Text style={{ color: 'red' }}>*</Text>{' '}
                    </Text>
                    <AddressPicker
                      value={signUpData?.city}
                      onChange={(city) => handleSignUpForm('city', city)}
                    />
                  </View>

                  <View
                    display={activeStep != 0 ? 'none' : undefined}
                    style={styles.inputContainer}
                  >
                    <Text style={styles.inputLabel}>
                      Chọn Quận, Huyện <Text style={{ color: 'red' }}>*</Text>
                    </Text>
                    <SubAddressPicker
                      value={signUpData?.workLocation}
                      cityId={signUpData?.city?._id}
                      onChange={(districtId) =>
                        handleSignUpForm('workLocation', districtId)
                      }
                    />
                  </View>

                  <View
                    display={activeStep != 0 ? 'none' : undefined}
                    style={styles.inputContainer}
                  >
                    <Text style={styles.inputLabel}>
                      Chọn công việc bạn muốn làm{' '}
                      <Text style={{ color: 'red' }}>*</Text>
                    </Text>
                    <TaskTagPicker
                      value={signUpData?.taskTag}
                      onChange={(tagId) => handleSignUpForm('taskTag', tagId)}
                    />
                  </View>

                  <View
                    display={activeStep != 1 ? 'none' : undefined}
                    style={styles.inputContainer}
                  >
                    <Text style={styles.inputLabel}>
                      Họ <Text style={{ color: 'red' }}>*</Text>
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      value={signUpData?.lastName}
                      onChangeText={(text) =>
                        handleSignUpForm('lastName', text)
                      }
                    />
                  </View>

                  <View
                    display={activeStep != 1 ? 'none' : undefined}
                    style={styles.inputContainer}
                  >
                    <Text style={styles.inputLabel}>
                      Tên <Text style={{ color: 'red' }}>*</Text>
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      value={signUpData?.firstName}
                      onChangeText={(text) =>
                        handleSignUpForm('firstName', text)
                      }
                    />
                  </View>

                  <View
                    display={activeStep != 1 ? 'none' : undefined}
                    style={styles.inputContainer}
                  >
                    <Text style={styles.inputLabel}>
                      Giới tính <Text style={{ color: 'red' }}>*</Text>
                    </Text>
                    <GenderPicker
                      value={signUpData?.gender}
                      onChange={(val) => handleSignUpForm('gender', val)}
                    />
                  </View>

                  <View
                    display={activeStep != 1 ? 'none' : undefined}
                    style={styles.inputContainer}
                  >
                    <Text style={styles.inputLabel}>
                      Ngày sinh <Text style={{ color: 'red' }}>*</Text>
                    </Text>
                    <DatePick
                      value={signUpData?.dayOfBirth}
                      onChange={(date) => handleSignUpForm('dayOfBirth', date)}
                    />
                  </View>

                  <View
                    display={activeStep != 2 ? 'none' : undefined}
                    style={styles.inputContainer}
                  >
                    <Text style={styles.inputLabel}>
                      Tên đăng nhập <Text style={{ color: 'red' }}>*</Text>
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      value={signUpData?.username}
                      onChangeText={(text) =>
                        handleSignUpForm('username', text)
                      }
                    />
                  </View>

                  <View
                    display={activeStep != 2 ? 'none' : undefined}
                    style={styles.inputContainer}
                  >
                    <Text style={styles.inputLabel}>
                      Mật khẩu <Text style={{ color: 'red' }}>*</Text>
                      {signUpData?.password?.length < 8 && (
                        <Text style={{ color: 'red', fontSize: 13 }}>
                          [Mật khẩu phải dài hơn 8 ký tự]
                        </Text>
                      )}
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      value={signUpData?.password}
                      onChangeText={(text) =>
                        handleSignUpForm('password', text)
                      }
                      secureTextEntry
                      textContentType="oneTimeCode"
                    />
                  </View>

                  <View
                    display={activeStep != 2 ? 'none' : undefined}
                    style={styles.inputContainer}
                  >
                    <Text style={styles.inputLabel}>
                      Nhập lại mật khẩu <Text style={{ color: 'red' }}>*</Text>
                      {signUpData?.confirmPassword != '' &&
                        signUpData?.password != signUpData?.confirmPassword && (
                          <Text style={{ color: 'red', fontSize: 13 }}>
                            [Mật khẩu không khớp]
                          </Text>
                        )}
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      value={signUpData?.confirmPassword}
                      onChangeText={(text) =>
                        handleSignUpForm('confirmPassword', text)
                      }
                      secureTextEntry
                      textContentType="oneTimeCode"
                    />
                  </View>

                  <View
                    display={activeStep != 2 ? 'none' : undefined}
                    style={styles.inputContainer}
                  >
                    <Text style={styles.inputLabel}>
                      Email <Text style={{ color: 'red' }}>*</Text>
                      {signUpData?.email != '' &&
                        !isValidEmail(signUpData?.email) && (
                          <Text style={{ color: 'red', fontSize: 13 }}>
                            [Email không đúng định dạng]
                          </Text>
                        )}
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      value={signUpData?.email}
                      onChangeText={(text) => handleSignUpForm('email', text)}
                    />
                  </View>

                  <View style={styles.fixToText}>
                    <Button
                      style={[styles.button, styles.backButton]}
                      disabled={activeStep < 1}
                      title="◀◁ Trở về"
                      onPress={() => handleSignUpBack()}
                    />
                    <Button
                      disabled={!signUpFormValid}
                      style={[styles.button, styles.submitButton]}
                      title={activeStep >= 2 ? 'Đăng ký' : 'Tiếp theo ▷▶'}
                      onPress={() =>
                        activeStep >= 2 ? handleSignUp() : handleSignUpNext()
                      }
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      marginTop: 16,
                      width: '100%',
                      paddingHorizontal: 16,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text
                        style={{
                          color: 'green',
                        }}
                      >
                        Đăng nhập
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </Modal>
        </React.Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white',
    marginTop: 150,
    paddingTop: Platform.OS === 'ios' ? 54 : 0,
  },
  signUpmodalContainer: {
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
    marginBottom: 8,
    width: '100%',
    paddingHorizontal: 16,
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
    borderRadius: 8,
  },
  button: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: 'green',
    width: '90%',
  },
  backButton: {
    backgroundColor: 'grey',
    width: '90%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    width: '100%',
    paddingHorizontal: 16,
  },
});

export default LoginScreen;
