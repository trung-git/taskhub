import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';

import TextUpdate from './TextUpdate';
import TextUpdateMultiLine from './TextUpdateMultiLine';
import UserUpdateModal from './UserUpdateModal';
import { Ionicons } from '@expo/vector-icons';
import DatePick from './DatePick';
import GenderPicker from './GenderPicker';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import locToString from '../config/locToString';
import axios from 'axios';
import { API_URL } from '../config/constans';
import { predictAmount } from '../config/predictAmount';
import ContractRejectModal from './ContractRejectModal';
import socket from '../config/socket';
import formatVietnameseCurrency from '../config/formatVietnameseCurrency';

const ContractTabDetail = ({ taskData, onRefresh }) => {
  const [taskDataVal, setTaskDataVal] = useState(taskData);
  const { t } = useTranslation();
  const [selectedField, setSelectedField] = useState(null);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  let fields = [
    {
      name: 'lastName',
      value: t(taskDataVal?.taskTag?.langKey),
      label: 'Công việc',
      component: TextUpdate,
      canUpdate: false,
    },
    {
      name: 'workTime',
      value: dayjs(taskDataVal?.workTime?.from).format('DD-MM-YYYY'),
      label: 'Ngày làm',
      component: TextUpdate,
      canUpdate: false,
    },
    {
      name: 'dateOfBirth',
      value: `${dayjs(taskDataVal?.workTime?.from).format('HH:mm')} - ${dayjs(
        taskDataVal?.workTime?.to
      ).format('HH:mm')}`,
      editValue: taskDataVal?.dateOfBirth,
      label: 'Thời gian làm việc',
      component: DatePick,
      canUpdate: false,
    },
    {
      name: 'workLocation',
      value: locToString(taskDataVal?.workLocation, false),
      editValue: taskDataVal?.workLocation,
      label: 'Khu vực làm việc',
      component: GenderPicker,
      canUpdate: false,
    },
    {
      name: 'address',
      value: taskDataVal?.address,
      label: 'Địa chỉ cụ thể',
      component: TextUpdate,
      canUpdate: false,
    },
    {
      name: 'price',
      value: taskDataVal?.price || '',
      label: 'Giá',
      component: TextUpdate,
      canUpdate: false,
    },
    {
      name: 'price',
      value: taskDataVal?.paymentPlan == 'one-time' ? 'Một lần' : 'Theo giờ',
      label: 'Thu nhập',
      component: TextUpdate,
      canUpdate: false,
    },
    {
      name: 'price',
      value:
        taskDataVal?.paymentType == 'by-wallet'
          ? 'Paypal'
          : 'Tiền mặt khi làm việc',
      label: 'Thanh toán',
      component: TextUpdate,
      canUpdate: false,
    },
    {
      name: 'price',
      value: formatVietnameseCurrency(
        predictAmount(
          taskDataVal?.workTime?.from,
          taskDataVal?.workTime?.to,
          taskDataVal?.price,
          taskDataVal?.paymentPlan
        )
      ),
      label: 'Thu nhập ước tính',
      component: TextUpdate,
      canUpdate: false,
    },
    {
      name: 'description',
      value: taskDataVal?.description || '',
      label: 'Chi tiết công việc',
      component: TextUpdateMultiLine,
      canUpdate: false,
    },
  ];

  if (
    taskData?.status === 'official' &&
    taskData?.paymentType === 'by-wallet'
  ) {
    fields.push({
      name: 'description',
      value: taskDataVal?.isPaid
        ? predictAmount(
            taskDataVal?.workTime?.from,
            taskDataVal?.workTime?.to,
            taskDataVal?.price,
            taskDataVal?.paymentPlan
          )
        : 'Chưa (Chỉ có thể bắt đầu khi đã thanh toán)',
      label: 'Đã thanh toán',
      component: TextUpdate,
      canUpdate: false,
    });
  }

  const handleFieldSelect = (field) => {
    console.log(
      'selectedField',
      field,
      fields.find((_ele) => _ele.name == field)
    );
    setSelectedField(fields.find((_ele) => _ele.name == field));
  };

  useEffect(() => {
    if (taskData) {
      setTaskDataVal(taskData);
    }
  }, [taskData]);

  useEffect(() => {
    if (selectedField) {
      setIsOpenEditModal(true);
    } else {
      setIsOpenEditModal(false);
    }
  }, [selectedField]);

  const refreshTaskData = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/contract/${taskData._id}`
      );
      const responseData = response.data.data;
      setTaskDataVal(responseData);
      // setChatId(responseData.chat);
      setRefreshing(false);
      onRefresh && onRefresh();
    } catch (error) {
      console.error('Error fetching data on tab task detail', error);
      setRefreshing(false);
    }
  };

  // const handleOnReject = (reason) => {};

  const handleOnReject = () => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn từ chối công việc này?', [
      {
        text: 'Hủy',
        style: 'cancel',
      },
      {
        text: 'Xác nhận',
        onPress: () => handleUpdateTaskState('rejected'),
      },
    ]);
  };

  const handleOnCancel = () => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn hủy công việc này?', [
      {
        text: 'Hủy',
        style: 'cancel',
      },
      {
        text: 'Xác nhận',
        onPress: () => handleUpdateTaskState('cancel'),
      },
    ]);
  };

  const handleUpdateTaskState = async (state) => {
    // setIsSubmitting(true);
    let taskUpdateValue = {
      status: state,
    };
    if (state === 'discuss') {
      taskUpdateValue.updateExpires = true;
    }
    if (state === 'official') {
      taskUpdateValue.updateExpires = true;
    }
    setRefreshing(true);
    try {
      const response = await axios.patch(
        `${API_URL}/api/v1/contract/${taskData._id}`,
        taskUpdateValue
      );
      const responseData = response.data.data;
      if (state === 'discuss' || state === 'rejected') {
        socket.emit('tasker-send-action-invitation', responseData.finder._id, {
          action: state,
          contract: responseData,
        });
      } else {
        socket.emit(
          'tasker-update-contract-state',
          responseData.finder._id,
          responseData
        );
      }
      socket.emit('tasker-reload-task-list');
      setTaskDataVal(responseData);
      console.log('User updated successfully:', response);
      // setTaskData(responseData);
      // toastSuccess('Update task success');
      // setIsSubmitting(false);
      setRefreshing(false);
      onRefresh && onRefresh();
    } catch (error) {
      console.error('Error updating user:', error);
      setRefreshing(false);
    }
  };

  const handleUpdateTaskTime = async (act) => {
    setRefreshing(true);
    try {
      const response = await axios.patch(
        `${API_URL}/api/v1/contract/${taskData._id}`,
        act === 'start'
          ? { startTime: dayjs(new Date()).toISOString() }
          : { endTime: dayjs(new Date()).toISOString() }
      );
      const responseData = response.data.data;
      socket.emit(
        'tasker-update-contract-state',
        responseData.finder._id,
        responseData
      );
      socket.emit('tasker-reload-task-list');
      setTaskDataVal(responseData);
      console.log('User updated successfully:', response);
      // setTaskData(responseData);
      // toastSuccess('Update task success');
      // setIsSubmitting(false);
      setRefreshing(false);
      onRefresh && onRefresh();
    } catch (error) {
      console.error('Error updating user:', error);
      setRefreshing(false);
    }
  };

  const handleStart = () => {
    Alert.alert('Xác nhận', 'Bạn đang bắt đầu công việc này?', [
      {
        text: 'Hủy',
        style: 'cancel',
      },
      {
        text: 'Xác nhận',
        onPress: () => handleUpdateTaskTime('start'),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          const { contentOffset } = nativeEvent;
          if (contentOffset.y < -100 && !refreshing) {
            refreshTaskData();
          }
        }}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshTaskData} />
        }
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 16,
          }}
        >
          <View style={{ marginTop: 16, width: '100%' }}>
            {fields.map((field, index) => {
              return (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // backgroundColor: 'red',
                    width: '100%',
                  }}
                  key={index}
                >
                  <TouchableOpacity
                    key={field?.name}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      paddingVertical: 12,
                    }}
                    onPress={() =>
                      field?.canUpdate ? handleFieldSelect(field?.name) : null
                    }
                  >
                    <Text
                      style={{ fontSize: 18, fontWeight: '500', width: '40%' }}
                    >
                      {field?.label} :
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        borderBottomWidth: 2,
                        borderStyle: 'solid',
                        borderColor: '#f0f0f0',
                      }}
                    >
                      <Text style={{ fontSize: 18, color: '#474747' }}>
                        {field?.value}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      {taskDataVal?.status === 'invitation' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.btncancel,
              refreshing && styles.btnDisable,
            ]}
            onPress={() => handleOnReject()}
          >
            <Text
              style={{
                color: 'red',
                fontSize: 20,
                ...(refreshing && styles.textDisable),
              }}
            >
              Từ chối
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.btnsuccess,
              refreshing && styles.btnDisable,
            ]}
            onPress={() => handleUpdateTaskState('discuss')}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                ...(refreshing && styles.textDisable),
              }}
            >
              Chấp nhận trao đổi
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {taskDataVal?.status === 'discuss' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.btncancel,
              refreshing && styles.btnDisable,
            ]}
            onPress={() => handleOnCancel()}
          >
            <Text
              style={{
                color: 'red',
                fontSize: 18,
                ...(refreshing && styles.textDisable),
              }}
            >
              Hủy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.btnsuccess,
              refreshing && styles.btnDisable,
            ]}
            onPress={() => handleUpdateTaskState('official')}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                ...(refreshing && styles.textDisable),
              }}
            >
              Đồng ý thực hiện
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {taskDataVal?.status === 'official' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.btncancel,
              refreshing || (taskDataVal?.endTime && styles.btnDisable),
            ]}
            onPress={() => handleOnCancel()}
          >
            <Text
              style={{
                color: 'red',
                fontSize: 20,
                ...(refreshing || (taskDataVal?.endTime && styles.textDisable)),
              }}
            >
              Hủy
            </Text>
          </TouchableOpacity>
          {!taskDataVal?.startTime ? (
            <TouchableOpacity
              style={[
                styles.button,
                styles.btnsuccess,
                (refreshing ||
                  (taskDataVal?.paymentType === 'by-wallet' &&
                    !taskDataVal?.isPaid)) &&
                  styles.btnDisable,
              ]}
              disabled={
                taskDataVal?.paymentType === 'by-wallet' && !taskDataVal?.isPaid
              }
              onPress={() => handleStart()}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  ...((refreshing ||
                    (taskDataVal?.paymentType === 'by-wallet' &&
                      !taskDataVal?.isPaid)) &&
                    styles.textDisable),
                }}
              >
                Bắt đầu
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.button,
                styles.btnsuccess,
                refreshing || (taskDataVal?.endTime && styles.btnDisable),
              ]}
              disabled={taskDataVal?.endTime}
              onPress={() => handleUpdateTaskTime('end')}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  ...(refreshing ||
                    (taskDataVal?.endTime && styles.textDisable)),
                }}
              >
                Kết thúc
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      {isOpenEditModal && selectedField && (
        <UserUpdateModal
          field={selectedField}
          isOpenEditModal={isOpenEditModal}
          onClose={() => setSelectedField(null)}
        />
      )}
      {/* {openReject && (
        <ContractRejectModal
          isRejectOpen={openReject}
          closeReject={() => setOpenReject(false)}
          taskId={taskDataVal?._id}
          onReject={(reason) => handleOnReject(reason)}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    overflow: 'scroll',
  },
  avatarVerifyContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    // backgroundColor: 'rgba(255, 255, 255, 0.7)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: 1,
  },
  initials: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  button: {
    // backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '45%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btncancel: {
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  btnDisable: {
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  textDisable: {
    color: 'grey',
  },
  btnsuccess: {
    backgroundColor: 'green',
  },
});

export default ContractTabDetail;
