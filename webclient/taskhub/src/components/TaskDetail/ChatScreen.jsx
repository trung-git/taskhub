import React, { useState, useEffect, useRef } from 'react';
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  useTheme,
  Avatar,
  Stack,
  Card,
} from '@mui/material';
import MainCard from '../../base/component/MainCard';
import dayjs from 'dayjs';
import CardContent from '../../themes/overrides/CardContent';
import Typography from '../../themes/overrides/Typography';
import { API_URL } from '../../base/config';
import axios from 'axios';
import useLogin from '../../hooks/useLogin';

function ChatScreen({ user, chatId }) {
  const [messages, setMessages] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const chatContainerRef = useRef(null);
  const endRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    endRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (chatContainerRef.current.scrollTop === 0 && !isLoadingMore) {
      setIsLoadingMore(true);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const newMessageObject = {
      text: newMessage,
      createdAt: new Date(),
    };

    setMessages([...messages, newMessageObject]);
    setNewMessage('');
    scrollToBottom();
  };

  const handleEnter = (event) => {
    if (event?.key !== 'Enter') {
      return;
    }
    handleSendMessage();
  };

  const [loading, setLoading] = useState(false);
  const { getUserToken } = useLogin();
  const token = getUserToken();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [lastChatId, setLastChatId] = useState('');
  const [lastOldChatId, setOldLastChatId] = useState('');

  const [loadingChat, setLoadingChat] = useState(false);
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHasMore, setIsHasMore] = useState(true);

  const fetchChatData = async (id) => {
    try {
      const response = await axios.get(
        `${API_URL}api/v1/chat/${id}/messages`,
        config
      );
      const responseData = response.data.data;
      setData(responseData);
      setLastChatId(responseData[0]?._id);
      setLoadingChat(false);
      if (response.data?.lenght < response.data?.recordsPerPage) {
        setIsHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchLoadOldChat = async (chatId, lastChatId) => {
    try {
      const response = await axios.get(
        `${API_URL}api/v1/chat/${chatId}/messages?messageId=${lastChatId}`,
        config
      );
      const responseData = response.data.data;
      setData((prev) => [...responseData, ...prev]);
      setOldLastChatId(lastChatId);
      setLastChatId(responseData[0]?._id);
      setIsLoadingMore(false);
      if (response.data?.lenght < response.data?.recordsPerPage) {
        setIsHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (chatId) {
      setLoadingChat(true);
      fetchChatData(chatId);
    }
  }, [chatId]);

  const [anchorElEmoji, setAnchorElEmoji] =
    useState(); /** No single type can cater for all elements */

  const handleOnEmojiButtonClick = (event) => {
    setAnchorElEmoji(anchorElEmoji ? null : event?.currentTarget);
  };

  // handle new message form
  const [message, setMessage] = useState('');

  const sendMessage = async (message) => {
    const messageData = {
      chatId: chatId,
      message: message,
    };
    try {
      const response = await axios.post(
        `${API_URL}api/v1/chat/send`,
        messageData,
        config
      );
      const responseData = response.data.data;
      setData((prevState) => {
        const newMessageIndex = prevState?.findIndex(
          (mess) => mess.content === responseData?.message?.content
        );
        console.log('newMessageIndex', newMessageIndex);
        if (newMessageIndex !== -1) {
          let newData = [...prevState];
          newData[newMessageIndex] = responseData?.message;
          return newData;
        } else {
          return prevState;
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOnSend = () => {
    if (message.trim() === '') {
      // openSnackbar({
      //   open: true,
      //   message: 'Message required',
      //   variant: 'alert',
      //   alert: {
      //     color: 'error'
      //   },
      //   close: false
      // })
    } else {
      const newMessage = {
        content: message,
        isSending: true,
        sender: user._id,
      };
      setData((prevState) => [...prevState, newMessage]);
      sendMessage(message);
    }
    setMessage('');
  };

  // handle emoji
  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };

  const emojiOpen = Boolean(anchorElEmoji);
  const emojiId = emojiOpen ? 'simple-popper' : undefined;

  const handleCloseEmoji = () => {
    setAnchorElEmoji(null);
  };

  return (
    <MainCard
      content={false}
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'grey.50',
        p: 2,
        borderRadius: '0 4px 4px 0',
        borderRight: '0px',
        height: '100%',
      }}
    >
      <Grid
        container
        direction="column"
        style={{ height: '100%', overflow: 'hidden' }}
      >
        <div
          ref={chatContainerRef}
          style={{
            flex: 1,
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
          }}
          onScroll={handleScroll}
        >
          {data.map((message, index) => (
            <Grid item xs={12} key={index}>
              {message.sender === user._id ? (
                <Stack spacing={1.25} direction="row">
                  <Grid container spacing={1} justifyContent="flex-end">
                    <Grid item xs={2} md={3} xl={4} />
                    <Grid item xs={10} md={9} xl={8}>
                      <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-start"
                      >
                        <Card
                          sx={{
                            display: 'inline-block',
                            float: 'right',
                            bgcolor: theme.palette.primary.main,
                            boxShadow: 'none',
                            ml: 1,
                          }}
                        >
                          <CardContent
                            sx={{
                              p: 1,
                              pb: '8px !important',
                              width: 'fit-content',
                              ml: 'auto',
                            }}
                          >
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                <Typography
                                  variant="h6"
                                  color={theme.palette.grey[0]}
                                  sx={{
                                    overflowWrap: 'anywhere',
                                    float: 'left',
                                  }}
                                >
                                  {message.content}
                                </Typography>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        align="right"
                        variant="subtitle2"
                        color="textSecondary"
                      >
                        {message?.isSending
                          ? 'Sending...'
                          : dayjs(message.createdAt).format('HH:mm')}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Avatar alt={''} src={''} sx={{ width: 40, height: 40 }} />
                </Stack>
              ) : (
                <Stack direction="row" spacing={1.25} alignItems="flext-start">
                  <Avatar alt={''} src={''} sx={{ width: 40, height: 40 }} />

                  <Grid container>
                    <Grid item xs={12} sm={7}>
                      <Card
                        sx={{
                          display: 'inline-block',
                          float: 'left',
                          bgcolor:
                            theme.palette.mode === 'dark'
                              ? 'background.background'
                              : 'grey.0',
                          boxShadow: 'none',
                        }}
                      >
                        <CardContent sx={{ p: 1, pb: '8px !important' }}>
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <Typography
                                variant="h6"
                                color="textPrimary"
                                sx={{ textAlign: 'left' }}
                              >
                                {message.content}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 1 }}>
                      <Typography
                        align="left"
                        variant="subtitle2"
                        color="textSecondary"
                      >
                        {dayjs(message.createdAt).format('HH:mm')}
                      </Typography>
                    </Grid>
                  </Grid>
                </Stack>
              )}
            </Grid>
          ))}
          {isLoadingMore && <CircularProgress />}
          <div ref={endRef} />
        </div>
        <Grid container alignItems="center">
          <TextField
            value={newMessage}
            onChange={(e) =>
              setMessage(
                e.target.value.length <= 1
                  ? e.target.value.trim()
                  : e.target.value
              )
            }
            placeholder="Type your message..."
            style={{ flex: 1, marginRight: '10px' }}
            onKeyPress={handleEnter}
          />
          <Button variant="contained" onClick={handleSendMessage}>
            Send
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
}

export default ChatScreen;
