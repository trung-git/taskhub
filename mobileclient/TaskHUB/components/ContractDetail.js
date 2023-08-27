import React, { useState } from 'react';
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
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import ChatPage from './ChatPage';
import ContractTabDetail from './ContractTabDetail';

const FirstRoute = () => <View style={{ flex: 1, backgroundColor: 'white' }} />;

const ContractDetail = ({ taskData, onClose }) => {
  const layout = useWindowDimensions();

  console.log('taskData', taskData);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Chi tiết' },
    { key: 'second', title: 'Tin nhắn' },
  ]);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <ContractTabDetail taskData={taskData} />;
      case 'second':
        return <ChatPage chatId={taskData?.chat} finder={taskData?.finder} />;
      default:
        return null;
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
          <TouchableOpacity onPress={() => onClose()}>
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            {taskData.finder.firstName}
          </Text>
          <TouchableOpacity>
            <Icon name="phone" size={20} />
          </TouchableOpacity>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
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
