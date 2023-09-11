import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  useWindowDimensions,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
  ActivityIndicator,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import ChatPage from './ChatPage';
import ContractTabDetail from './ContractTabDetail';
import { API_URL } from '../config/constans';
import axios from 'axios';
import { AuthContext } from '../provider/AuthContext';
import socket from '../config/socket';

const FirstRoute = () => <View style={{ flex: 1, backgroundColor: 'white' }} />;

const ContractDetail = ({ taskData, onClose }) => {
  const { setIsInChat, setCurrentTaskerInContract } = useContext(AuthContext);
  const layout = useWindowDimensions();

  const [taskDataVal, setTaskDataVal] = useState(taskData);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Chi tiết' },
    { key: 'second', title: 'Tin nhắn' },
  ]);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return (
          <ContractTabDetail
            taskData={taskDataVal}
            onRefresh={refreshTaskData}
          />
        );
      case 'second':
        return taskDataVal?.status === 'invitation' ? (
          <View
            styles={{
              height: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'red',
            }}
          >
            <Text>Bạn có thể trau đổi sau khi đã chấp nhận lời mời này</Text>
          </View>
        ) : (
          <ChatPage
            chatId={taskDataVal?.chat}
            finder={taskDataVal?.finder}
            taskDataVal={taskDataVal}
          />
        );
      default:
        return null;
    }
  };

  const refreshTaskData = async () => {
    setIsRefreshing(true);
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/contract/${taskData._id}`
      );
      const responseData = response.data.data;
      setTaskDataVal(responseData);
      setIsRefreshing(false);
    } catch (error) {
      console.error('Error fetching data on tab task detail', error);
      setIsRefreshing(false);
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      labelStyle={{ fontWeight: 600 }}
      style={{ backgroundColor: 'green' }}
    />
  );
  useEffect(() => {
    taskDataVal?.tasker?._id && setCurrentTaskerInContract(taskDataVal?.tasker?._id);
  }, [taskDataVal?.tasker?._id])
  useEffect(() => {
    socket.on('server-emit-update-contract', (contractDetail) => {
      if (String(contractDetail._id) === String(taskDataVal._id)) {
        refreshTaskData();
      }
    })
  }, [])
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
            // backgroundColor: 'green',
            height: 52,
            overflow: 'hidden',
            // color: 'white'
          }}
        >
          <TouchableOpacity onPress={() => {
            onClose();
            setIsInChat(false);
          }}>
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            {taskData.finder.firstName}
          </Text>
          <TouchableOpacity onPress={() => refreshTaskData()}>
            {isRefreshing ? (
              <ActivityIndicator size="small" color="green" />
            ) : (
              <Icon name="rotate-right" size={24} />
            )}
          </TouchableOpacity>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={(index) => {
            if (index === 1) {
              setIsInChat(true);
            } else {
              setIsInChat(false);
            }
            setIndex(index);
          }}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ContractDetail;

const styles = {
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  messagesContainer: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    paddingHorizontal: 10,
  },
  sentMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
  },
  receivedMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  messageContent: {
    maxWidth: '70%',
    paddingHorizontal: 10,
    display: 'flex',
  },
  sentMessageText: {
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4db000',
    overflow: 'hidden',
  },
  receivedMessageText: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  messageTimeSend: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
    textAlign: 'right',
  },
  messageTimeReceive: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#4db000',
  },
};
