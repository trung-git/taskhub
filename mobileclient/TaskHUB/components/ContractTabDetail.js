import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import TextUpdate from './TextUpdate';
import TextUpdateMultiLine from './TextUpdateMultiLine';
import UserUpdateModal from './UserUpdateModal';
import { Ionicons } from '@expo/vector-icons';
import DatePick from './DatePick';
import GenderPicker from './GenderPicker';
import dayjs from 'dayjs';

const ContractTabDetail = ({ taskData }) => {
  // const { userData } = useContext(AuthContext);
  // const initials = userData.firstName
  //   ? userData.firstName.charAt(0).toUpperCase()
  //   : '';
  // console.log('userDatatab', userData?.image);

  const fields = [
    {
      name: 'lastName',
      value: taskData?.lastName,
      label: 'Công việc',
      component: TextUpdate,
      canUpdate: false,
    },
    {
      name: 'firstName',
      value: taskData?.firstName,
      label: 'Ngày làm',
      component: TextUpdate,
      canUpdate: false,
    },
    {
      name: 'dateOfBirth',
      value: dayjs(taskData?.dateOfBirth).format('DD-MM-YYYY'),
      editValue: taskData?.dateOfBirth,
      label: 'Thời gian làm việc',
      component: DatePick,
      canUpdate: false,
    },
    {
      name: 'gender',
      value: taskData?.gender == 'Male' ? 'Nam' : 'Nữ',
      editValue: taskData?.gender,
      label: 'Khu vực làm việc',
      component: GenderPicker,
      canUpdate: false,
    },
    {
      name: 'phoneNumber',
      value: taskData?.phoneNumber,
      label: 'Địa chỉ cụ thể',
      component: TextUpdate,
      canUpdate: false,
    },
    {
      name: 'email',
      value: taskData?.email || '',
      label: 'Email',
      component: TextUpdate,
      canUpdate: false,
    },
    {
      name: 'aboutMe',
      value: taskData?.aboutMe || '',
      label: 'Chi tiết công việc',
      component: TextUpdateMultiLine,
      canUpdate: false,
    },
    {
      name: 'skillAndExperience',
      value: taskData?.skillAndExperience || '',
      label: 'Bạn có thể giúp gì',
      component: TextUpdateMultiLine,
      canUpdate: false,
    },
  ];

  const [selectedField, setSelectedField] = useState(null);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const handleFieldSelect = (field) => {
    console.log(
      'selectedField',
      field,
      fields.find((_ele) => _ele.name == field)
    );
    setSelectedField(fields.find((_ele) => _ele.name == field));
  };

  useEffect(() => {
    if (selectedField) {
      setIsOpenEditModal(true);
    } else {
      setIsOpenEditModal(false);
    }
  }, [selectedField]);

  const [refreshing, setRefreshing] = useState(false);

  const refreshPosts = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          const { contentOffset } = nativeEvent;
          if (contentOffset.y < -100 && !refreshing) {
            refreshPosts();
          }
        }}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshPosts} />
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
            {fields.map((field) => {
              return (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // backgroundColor: 'red',
                    width: '100%',
                  }}
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

export default ContractTabDetail;
