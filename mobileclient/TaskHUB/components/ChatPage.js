import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { AuthContext } from '../provider/AuthContext';
import { Avatar } from 'react-native-elements';

const ChatPage = ({ chatId, onClose }) => {
  const { userData } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [keyboardOffset, setKeyboardOffset] = useState(8);

  console.log('useruserData', chatId);

  const handleSend = () => {
    const currentTime = moment().format('h:mm A');
    if (inputText.trim() !== '') {
      setMessages([
        {
          id: messages.length + 1,
          text: inputText,
          isSent: true,
          time: currentTime,
        },
        ...messages,
      ]);
      setInputText('');
    }
  };

  const handleRecive = () => {
    const currentTime = moment().format('h:mm A');
    if (inputText.trim() !== '') {
      setMessages([
        {
          id: messages.length + 1,
          text: inputText,
          isSent: false,
          time: currentTime,
        },
        ...messages,
      ]);
      setInputText('');
    }
  };

  const renderMessage = ({ item }) => {
    const messageContainerStyle = item.isSent
      ? styles.sentMessageContainer
      : styles.receivedMessageContainer;
    const messageTextStyle = item.isSent
      ? styles.sentMessageText
      : styles.receivedMessageText;
    const senderAvatar = userData?.image;
    const reciverAvatar = userData?.image;

    return (
      <View style={messageContainerStyle}>
        {!item.isSent && (
          <Avatar rounded size={20} source={{ uri: reciverAvatar }} />
        )}
        <View style={styles.messageContent}>
          <Text style={messageTextStyle}>{item.text}</Text>
          {item.isSent && (
            <Text style={styles.messageTimeSend}>{item.time}</Text>
          )}
          {!item.isSent && (
            <Text style={styles.messageTimeReceive}>{item.time}</Text>
          )}
        </View>
        {item.isSent && (
          <Avatar rounded size={20} source={{ uri: senderAvatar }} />
        )}
      </View>
    );
  };

  // <View
  //   style={{
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     justifyContent: 'space-between',
  //     padding: 10,
  //   }}>
  //   <TouchableOpacity onPress={() => onClose()}>
  //     <Icon name="arrow-left" size={20} />
  //   </TouchableOpacity>
  //   <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
  //     {user.sender}
  //   </Text>
  //   <TouchableOpacity>
  //     <Icon name="phone" size={20} />
  //   </TouchableOpacity>
  // </View>

  // <TouchableOpacity onPress={handleRecive}>
  //   <Icon
  //     name="send"
  //     color="blue"
  //     size={20}
  //     style={{ marginRight: 8, padding: 8 }}
  //   />
  // </TouchableOpacity>

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1, paddingVertical: 10 }}
        inverted
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingBottom: 8,
          alignItems: 'center',
        }}
      >
        <TextInput
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: 'gray',
            marginRight: 10,
            marginLeft: 10,
            paddingHorizontal: 10,
            borderRadius: 20,
          }}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message"
        />
        <TouchableOpacity onPress={handleSend}>
          <Icon
            name="send"
            size={30}
            color="green"
            style={{ marginRight: 8, padding: 8 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatPage;

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
