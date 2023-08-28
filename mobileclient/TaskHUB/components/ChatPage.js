import React, { useState, useEffect, useContext, useRef } from 'react';
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
import axios from 'axios';
import { API_URL } from '../config/constans';
import dayjs from 'dayjs';

const ChatPage = ({ chatId, finder }) => {
  const { userData } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [keyboardOffset, setKeyboardOffset] = useState(8);
  const [isFetching, setIsFetching] = useState(false);
  const [lastChatId, setLastChatId] = useState('');
  const [isScrollBottom, setIsScrollBottom] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    setLastChatId(messages?.[messages?.length - 1]?._id);
  }, [messages]);

  // console.log('messageChatData', finder);

  const fetchData = async (chatId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/chat/${chatId}/messages`
      );
      const responseData = response.data.data;
      setMessages(responseData);
      setIsFetching(false);
    } catch (error) {
      console.error('Error fetching data in Chat :', error);
      // return [];
    }
  };

  useEffect(() => {
    setIsFetching(true);
    fetchData(chatId);
  }, [chatId]);

  const handleSend = () => {
    if (inputText.trim() !== '') {
      setMessages([
        {
          id: messages.length + 1,
          content: inputText,
          isSent: true,
          createdAt: dayjs(),
          sender: userData?._id,
          isSending: true,
        },
        ...messages,
      ]);
      if (flatListRef.current) {
        const newIndex = messages.length - 1;
        flatListRef.current.scrollToIndex({ index: 0, animated: true });
      }
      setInputText('');
    }
  };

  const fetchLoadOldChat = async (chatId, lastChatId) => {
    if (chatId && lastChatId) {
      try {
        const response = await axios.get(
          `${API_URL}/api/v1/chat/${chatId}/messages/?messageId=${lastChatId}`
        );
        const responseData = response.data.data;
        console.log('loadOldMessage', responseData);
        setMessages((prev) => [...prev, ...responseData]);
      } catch (error) {
        console.error(
          'Error fetching data:',
          error,
          chatId,
          'last',
          lastChatId
        );
      }
    }
  };

  const renderMessage = ({ item }) => {
    const messageContainerStyle =
      item.sender === userData?._id
        ? styles.sentMessageContainer
        : styles.receivedMessageContainer;

    const messageTextStyle =
      item.sender === userData?._id
        ? styles.sentMessageText
        : styles.receivedMessageText;

    const senderAvatar = userData?.image;
    const reciverAvatar = finder?.image;

    return (
      <View style={messageContainerStyle}>
        {item.sender !== userData?._id && (
          <Avatar rounded size={20} source={{ uri: reciverAvatar }} />
        )}
        <View style={styles.messageContent}>
          <Text style={messageTextStyle}>{item.content}</Text>
          {item.isSent && (
            <Text style={styles.messageTimeSend}>
              {item.isSending
                ? 'Đang gởi...'
                : dayjs(item.createdAt).format('HH:mm')}
            </Text>
          )}
          {!item.isSent && (
            <Text style={styles.messageTimeReceive}>
              {dayjs(item.createdAt).format('HH:mm')}
            </Text>
          )}
        </View>
        {item.sender === userData?._id && (
          <Avatar rounded size={20} source={{ uri: senderAvatar }} />
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item._id?.toString()}
        contentContainerStyle={{ flexGrow: 1, paddingVertical: 10 }}
        inverted
        ref={flatListRef}
        onEndReached={() => fetchLoadOldChat(chatId, lastChatId)} // Triggered when scrolling to the top
        onEndReachedThreshold={0.2}
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
