import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import dayjs from 'dayjs';
import i18n from '../i18n';
import { API_URL } from '../config/constans';

const TaskListPage = ({ onOpenChat, status }) => {
  const openChat = (item) => {
    onOpenChat(item);
  };

  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const locToString = (location) => {
    return `${i18n.t(location?.city?.prefix)} ${location?.city?.name}, ${i18n.t(
      location?.prefix
    )} ${location?.name}`;
  };

  const fetchData = async (status) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/contract/?status=${status}`
      );
      const responseData = response.data.data;
      setTask(responseData);
      setRefreshing(false);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      // return [];
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchData(status);
  }, [status]);

  const renderTaskItem = ({ item }) => {
    console.log('itemrenderTaskItem', JSON.stringify(item));
    return (
      <TouchableOpacity style={styles.chatItem} onPress={() => openChat(item)}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 32, marginBottom: 8 }}>
              {i18n.t(item?.taskTag?.langKey || '')}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Ionicons name="calendar" size={24} color="green" />
              <Text style={{ fontSize: 16 }}>
                {dayjs(item?.workTime?.from).format('DD-MM-YYYY')}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Ionicons name="time" size={24} color="green" />
              <Text style={{ fontSize: 16 }}>
                {dayjs(item?.workTime?.from).format('HH:mm')}
              </Text>
              <Text style={{ fontSize: 16 }}>-</Text>
              <Text style={{ fontSize: 16 }}>
                {dayjs(item?.workTime?.to).format('HH:mm')}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Ionicons name="map" size={24} color="green" />
              <Text style={{ fontSize: 16 }}>
                {locToString(item?.workLocation)}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={{
                uri: item?.finder?.image
                  ? item?.finder?.image
                  : 'https://cdn.iconscout.com/icon/free/png-256/free-user-avatar-contact-portfolio-personal-portrait-profile-5093.png?f=webp',
              }}
              style={styles.avatar}
            />
            <View style={{ marginTop: 8 }}>
              <Text style={{}}>{item?.finder?.firstName}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginVertical: 16, marginLeft: '5%', fontSize: 16 }}>
        New task (15)
      </Text>
      <FlatList
        data={task}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item._id.toString()}
      />
      {loading && <ActivityIndicator style={styles.loading} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatItem: {
    backgroundColor: 'white',
    padding: 16,
    borderLeftWidth: 16,
    borderLeftColor: 'green',
    width: '90%',
    marginLeft: '5%',
    marginBottom: 24,
    borderBottomRightRadius: 16,
    borderTopRightRadius: 16,
    // borderRadius: 16,
    borderStyle: 'solid',
    borderColor: 'green',
    borderWidth: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default TaskListPage;
