import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  useTheme,
  Avatar,
  Stack,
  Card,
  CardContent,
  Typography,
  IconButton,
  Popper,
  ClickAwayListener,
  Box,
} from '@mui/material';
import MainCard from '../../base/component/MainCard';
import dayjs from 'dayjs';
// import CardContent from '../../themes/overrides/CardContent';
// import Typography from '../../themes/overrides/Typography';
import { API_URL } from '../../base/config';
import axios from 'axios';
import useLogin from '../../hooks/useLogin';

import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Picker, { IEmojiData, SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import { toast } from 'react-toastify';

function ChatScreen({ user, chatId, otherUser }) {
  const [messages, setMessages] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastChatId, setLastChatId] = useState('');
  const [lastOldChatId, setOldLastChatId] = useState('');

  const [loadingChat, setLoadingChat] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHasMore, setIsHasMore] = useState(true);
  const [message, setMessage] = useState('');

  const chatContainerRef = useRef(null);
  const endRef = useRef(null);
  const theme = useTheme();
  const [isScrollBottom, setIsScrollBottom] = useState(false);

  useEffect(() => {
    if (isScrollBottom) {
      scrollToBottom();
    }
    setLastChatId(messages?.[messages?.length - 1]?._id);
  }, [messages, isScrollBottom]);

  const scrollToBottom = () => {
    endRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (
      chatContainerRef.current.scrollHeight - 20 <=
        chatContainerRef.current.clientHeight -
          chatContainerRef.current.scrollTop &&
      !isLoadingMore &&
      isHasMore
    ) {
      setIsLoadingMore(true);
      fetchLoadOldChat(chatId, lastChatId);
    }
  };

  const handleEnter = (event) => {
    if (event?.key !== 'Enter') {
      return;
    }
    handleOnSend();
  };

  const { getUserToken } = useLogin();
  const token = getUserToken();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchChatData = async (id) => {
    try {
      const response = await axios.get(
        `${API_URL}api/v1/chat/${id}/messages`,
        config
      );
      const responseData = response.data.data;
      setMessages(responseData);
      setLoadingChat(false);
      if (response.data?.lenght < 20) {
        setIsHasMore(false);
      }
      setIsScrollBottom(true);
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
      setIsScrollBottom(false);
      setMessages((prev) => [...prev, ...responseData]);
      setOldLastChatId(lastChatId);
      setIsLoadingMore(false);
      if (response.data?.lenght < 20) {
        setIsHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (chatId && chatId !== '') {
      setLoadingChat(true);
      fetchChatData(chatId);
    }
  }, [chatId]);

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
      setMessages((prevState) => {
        return prevState?.map((_message) => {
          return {
            ..._message,
            isSending: false,
          };
        });
      });
      endRef.current.scrollTo(0, 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOnSend = () => {
    if (message.trim() === '') {
      toast.error(`Can't send null message`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      });
    } else {
      const newMessage = {
        content: message,
        isSending: true,
        sender: user._id,
      };
      setMessages((prevState) => [newMessage, ...prevState]);
      sendMessage(message);
    }
    setMessage('');
    scrollToBottom();
  };

  const [anchorElEmoji, setAnchorElEmoji] = useState();

  const handleOnEmojiButtonClick = (event) => {
    setAnchorElEmoji(event?.currentTarget);
  };

  // handle emoji
  const onEmojiClick = (emojiObject, event) => {
    setMessage(message + emojiObject.emoji);
  };

  const emojiOpen = Boolean(anchorElEmoji);
  const emojiId = emojiOpen ? 'simple-popper' : undefined;

  const handleCloseEmoji = () => {
    setAnchorElEmoji(null);
  };

  const RenderChatMemo = useMemo(() => {
    return (
      messages?.length > 0 &&
      messages?.map((_message, index) => {
        return (
          <Grid item xs={12} key={_message?._id}>
            {_message.sender === user._id ? (
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
                                  textAlign: 'left',
                                }}
                              >
                                {_message?.content}
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
                      {_message?.isSending
                        ? 'Sending...'
                        : dayjs(_message?.createdAt).format('HH:mm')}
                    </Typography>
                  </Grid>
                </Grid>
                <Avatar
                  alt={''}
                  src={user?.image}
                  sx={{ width: 40, height: 40 }}
                />
              </Stack>
            ) : (
              <Stack direction="row" spacing={1.25} alignItems="flext-start">
                <Avatar
                  alt={''}
                  src={otherUser?.image}
                  sx={{ width: 40, height: 40 }}
                />

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
                              sx={{
                                overflowWrap: 'anywhere',
                                textAlign: 'left',
                              }}
                            >
                              {_message?.content}
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
                      {dayjs(_message?.createdAt).format('HH:mm')}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            )}
          </Grid>
        );
      })
    );
  }, [messages]);

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
        style={{ height: '100%', overflow: 'hidden', p: 2 }}
      >
        <div
          ref={chatContainerRef}
          style={{
            flex: 1,
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column-reverse',
            padding: '10px',
          }}
          onScroll={handleScroll}
        >
          <div ref={endRef} style={{ pt: 5 }} />
          {RenderChatMemo}
          {isLoadingMore && isHasMore && <CircularProgress />}
        </div>
        <Stack
          spacing={1}
          direction={'row'}
          // container
          alignItems="center"
          sx={{ pt: 2 }}
        >
          <IconButton>
            <ImageIcon />
          </IconButton>
          <Grid item>
            <IconButton
              ref={anchorElEmoji}
              aria-describedby={emojiId}
              onClick={(e) => handleOnEmojiButtonClick(e)}
            >
              <SentimentSatisfiedAltIcon />
            </IconButton>
            <Popper
              id={emojiId}
              open={emojiOpen}
              anchorEl={anchorElEmoji}
              disablePortal
              placement={'top'}
            >
              <ClickAwayListener onClickAway={handleCloseEmoji}>
                <Box>
                  <Picker onEmojiClick={onEmojiClick} disableAutoFocus />
                </Box>
              </ClickAwayListener>
            </Popper>
          </Grid>

          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            style={{ flex: 1, marginRight: '10px' }}
            onKeyUp={handleEnter}
          />
          <IconButton onClick={handleOnSend}>
            <SendIcon />
          </IconButton>
        </Stack>
      </Grid>
    </MainCard>
  );
}

export default ChatScreen;
