import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { AuthContext } from '../provider/AuthContext';
import UserSreenImage from './UserSreenImage';
import TextUpdate from './TextUpdate';
import TextUpdateMultiLine from './TextUpdateMultiLine';
import UserUpdateModal from './UserUpdateModal';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from './DateTimePicker';
import DatePick from './DatePick';
import GenderPicker from './GenderPicker';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import WorkLocationSelect from './WorkLocationSelect';

const UserScreen = () => {
  const { userData } = useContext(AuthContext);
  const { t } = useTranslation();
  const initials = userData.firstName
    ? userData.firstName.charAt(0).toUpperCase()
    : '';
  console.log('userData', userData);

  const fields = [
    {
      name: 'lastName',
      value: userData?.lastName,
      label: 'Họ',
      component: TextUpdate,
    },
    {
      name: 'firstName',
      value: userData?.firstName,
      label: 'Tên',
      component: TextUpdate,
    },
    {
      name: 'dateOfBirth',
      value: dayjs(userData?.dateOfBirth).format('DD-MM-YYYY'),
      editValue: userData?.dateOfBirth,
      label: 'Ngày sinh',
      component: DatePick,
    },
    {
      name: 'gender',
      value: userData?.gender == 'Male' ? 'Nam' : 'Nữ',
      editValue: userData?.gender,
      label: 'Giới tính',
      component: GenderPicker,
    },
    {
      name: 'phoneNumber',
      value: userData?.phoneNumber,
      label: 'Điện thoại',
      component: TextUpdate,
    },
    {
      name: 'email',
      value: userData?.email || '',
      label: 'Email',
      component: TextUpdate,
    },
    {
      name: 'aboutMe',
      value: userData?.aboutMe || '',
      label: 'Mô tả bản thân',
      component: TextUpdateMultiLine,
    },
    {
      name: 'skillAndExperience',
      value: userData?.skillAndExperience || '',
      label: 'Bạn có thể giúp gì',
      component: TextUpdateMultiLine,
    },
  ];

  const workFields = [
    {
      name: 'taskTag',
      value: userData?.taskTag
        ?.map((tag) => {
          return t(tag?.taskInfo?.langKey);
        })
        .join(','),
      label: 'Công việc',
      editValue: userData?.taskTag,
      component: TextUpdate,
    },
    {
      name: 'workLocation',
      value: userData?.workLocation
        ?.map((loc) => {
          return `${t(loc?.prefix)} ${loc?.name}`;
        })
        .join(','),
      label: 'Khu vực làm',
      editValue: userData?.workLocation,
      component: WorkLocationSelect,
    },
  ];

  const [selectedField, setSelectedField] = useState(null);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const handleFieldSelect = (field) => {
    console.log(
      'selectedField',
      field,
      fields.concat(workFields).find((_ele) => _ele.name == field)
    );
    setSelectedField(
      fields.concat(workFields).find((_ele) => _ele.name == field)
    );
  };

  useEffect(() => {
    if (selectedField) {
      setIsOpenEditModal(true);
      console.log('OpentModal');
    } else {
      setIsOpenEditModal(false);
    }
  }, [selectedField]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 16,
          }}
        >
          {userData?.image && userData?.image != '' ? (
            <View style={styles.avatarVerifyContainer}>
              <Avatar rounded size={150} source={{ uri: userData?.image }} />
              <View style={styles.tickIcon}>
                <Ionicons name={'checkmark-circle'} size={40} color={'green'} />
              </View>
            </View>
          ) : (
            <View style={styles.avatarContainer}>
              <Text style={styles.initials}>{initials}</Text>
            </View>
          )}
          <UserSreenImage />
          <View
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              paddingVertical: 12,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                flex: 1,
                textAlign: 'center',
              }}
            >
              Thông tin cá nhân
            </Text>
          </View>
          <View style={{ marginTop: 16, width: '100%' }}>
            {fields.map((field) => {
              return (
                <View
                  key={field?.name}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // backgroundColor: 'red',
                    width: '100%',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      paddingVertical: 12,
                    }}
                    onPress={() => handleFieldSelect(field?.name)}
                  >
                    <Text
                      style={{ fontSize: 18, fontWeight: '500', width: '30%' }}
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
                      <Text
                        style={{ fontSize: 18, color: '#474747' }}
                        numberOfLines={3}
                        ellipsizeMode="tail"
                      >
                        {field?.value}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <View
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              paddingVertical: 12,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                flex: 1,
                textAlign: 'center',
              }}
            >
              Thông tin đăng ký làm việc
            </Text>
          </View>
          <View style={{ marginTop: 16, width: '100%' }}>
            {workFields.map((field) => {
              return (
                <View
                  key={field?.name}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // backgroundColor: 'red',
                    width: '100%',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      paddingVertical: 12,
                    }}
                    onPress={() => handleFieldSelect(field?.name)}
                  >
                    <Text
                      style={{ fontSize: 18, fontWeight: '500', width: '30%' }}
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
                      <Text
                        style={{ fontSize: 18, color: '#474747' }}
                        numberOfLines={3}
                        ellipsizeMode="tail"
                      >
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
      {isOpenEditModal && selectedField && (
        <UserUpdateModal
          field={selectedField}
          isOpenEditModal={isOpenEditModal}
          onClose={() => setSelectedField(null)}
        />
      )}
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
});

export default UserScreen;
