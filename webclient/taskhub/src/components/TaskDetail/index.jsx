import {
  Box,
  ClickAwayListener,
  Collapse,
  Container,
  Grid,
  IconButton,
  Popper,
  Stack,
  TextField,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useParams } from 'react-router';
import NavBar from '../Home/NavBar';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { LoginContext } from '../../provider/LoginContext';
import axios from 'axios';
import { API_URL } from '../../base/config';
import useLogin from '../../hooks/useLogin';
import MainCard from '../../base/component/MainCard';
import ChatHistory from './ChatHistory';
import SimpleBar from '../../base/third-party/SimpleBar';
import Picker, { IEmojiData, SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';

import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import TaskViewDetail from './TaskViewDetail';

const drawerWidth = 320;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter,
    }),
    marginLeft: `-${drawerWidth}px`,
    [theme.breakpoints.down('lg')]: {
      paddingLeft: 0,
      marginLeft: 0,
    },
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shorter,
      }),
      marginLeft: 0,
    }),
  })
);

const TaskDetail = () => {
  const { isLogin, currentUser } = useContext(LoginContext);
  const params = useParams();
  const id = params?.id;
  const [loading, setLoading] = useState(false);
  const [taskData, setTaskData] = useState(null);
  const { getUserToken } = useLogin();
  const token = getUserToken();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchData = async (id) => {
    try {
      const response = await axios.get(
        `${API_URL}api/v1/contract/${id}`,
        config
      );
      const responseData = response.data.data;
      setTaskData(responseData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchData(id);
    }
  }, [id]);

  const theme = useTheme();

  const matchDownSM = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const [viewChat, setViewChat] = useState(false);
  const [chatId, setChatId] = useState('');
  const [lastChatId, setLastChatId] = useState('');
  const [lastOldChatId, setOldLastChatId] = useState('');

  const [loadingChat, setLoadingChat] = useState(false);
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHasMore, setIsHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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
    if (taskData) {
      setLoadingChat(true);
      // setUser(taskData?.finder);
      setChatId(taskData?.chat);
      fetchChatData(taskData?.chat);
    }
  }, [taskData]);

  const handleToggleChat = () => {
    setViewChat((prev) => !prev);
  };

  const [anchorElEmoji, setAnchorElEmoji] =
    useState(); /** No single type can cater for all elements */

  const handleOnEmojiButtonClick = (event) => {
    setAnchorElEmoji(anchorElEmoji ? null : event?.currentTarget);
  };

  // handle new message form
  const [message, setMessage] = useState('');
  const [isScrollBottom, setIsScrollBottom] = useState(true);
  const textInput = useRef(null);

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
      setIsScrollBottom(false);
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

  console.log('dataOnchange', data);

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
        sender: currentUser._id,
      };
      setData((prevState) => [...prevState, newMessage]);
      setIsScrollBottom(true);
      sendMessage(message);
    }
    setMessage('');
  };

  const handleEnter = (event) => {
    if (event?.key !== 'Enter') {
      return;
    }
    handleOnSend();
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

  const containerRef = useRef(null);
  // const handleScroll = useCallback(() => {
  //   console.log(
  //     'chatIlastChatId',
  //     chatId,
  //     lastChatId,
  //     isLoadingMore,
  //     isHasMore
  //   );
  //   if (containerRef.current.scrollTop === 0 && !isLoadingMore && isHasMore) {
  //     setIsLoadingMore(true);
  //     fetchLoadOldChat(chatId, lastChatId);
  //   }
  // }, [chatId, lastChatId, isLoadingMore, isHasMore]);

  const handleScroll = (chatId, lastChatId, isLoadingMore, isHasMore) => {
    console.log(
      'chatIlastChatId',
      chatId,
      lastChatId,
      isLoadingMore,
      isHasMore
    );
    if (containerRef.current.scrollTop === 0 && !isLoadingMore && isHasMore) {
      setIsLoadingMore(true);
      fetchLoadOldChat(chatId, lastChatId);
    }
  };

  useEffect(() => {
    containerRef?.current?.addEventListener(
      'scroll',
      handleScroll(chatId, lastChatId, isLoadingMore, isHasMore)
    );
    return () => {
      containerRef?.current?.removeEventListener(
        'scroll',
        handleScroll(chatId, lastChatId, isLoadingMore, isHasMore)
      );
    };
  }, [chatId, lastChatId, isLoadingMore, isHasMore]);

  return (
    <Box sx={{ width: '100%' }}>
      <NavBar isLogin={isLogin} />
      <Container maxWidth="lg" sx={{ mt: 3, height: 'calc(100vh - 116px)' }}>
        <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
          {/* <Main theme={theme}> */}
          <Grid container sx={{ height: '100%' }}>
            {!matchDownMD && taskData && (
              <Grid
                item
                xs={12}
                // md={viewChat ? 6 : 12}
                // xl={viewChat ? 6 : 12}
                md={6}
                xl={6}
              >
                <TaskViewDetail
                  task={taskData}
                  viewChat={viewChat}
                  onToggleChat={handleToggleChat}
                />
              </Grid>
            )}
            {/* {viewChat && ( */}
            <Grid item xs={12} md={6} xl={6}>
              <MainCard
                content={false}
                sx={{
                  bgcolor:
                    theme.palette.mode === 'dark' ? 'dark.main' : 'grey.50',
                  pt: 2,
                  pl: 2,
                  borderRadius: viewChat ? '0' : '0 4px 4px 0',
                  height: '100%',
                }}
              >
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      bgcolor: theme.palette.background.paper,
                      pr: 2,
                      pb: 2,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems={'center'}
                    >
                      <Grid item>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Stack direction={'row'} alignItems={'center'}>
                            <Typography variant="subtitle1">
                              Trò chuyện
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    {/* <SimpleBar
                          sx={{
                            overflowX: 'hidden',
                            height: 'calc(100vh - 410px)',
                            minHeight: 420,
                          }}
                        > */}
                    <Box
                      sx={{
                        pl: 1,
                        pr: 3,
                        overflowX: 'hidden',
                        height: 'calc(100vh - 410px)',
                        minHeight: 420,
                      }}
                      ref={containerRef}
                    >
                      <ChatHistory
                        theme={theme}
                        user={currentUser}
                        data={data}
                        // onLoadMore={fetchLoadOldChat(lastChatId)}
                        isLoadingMore={isLoadingMore}
                        isScrollBottom={isScrollBottom}
                        scrollToId={lastOldChatId}
                      />
                    </Box>
                    {/* </SimpleBar> */}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      mt: 3,
                      bgcolor: theme.palette.background.paper,
                      borderTop: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <Stack>
                      <TextField
                        inputRef={textInput}
                        fullWidth
                        multiline
                        rows={2}
                        placeholder="Your Message..."
                        value={message}
                        onChange={(e) =>
                          setMessage(
                            e.target.value.length <= 1
                              ? e.target.value.trim()
                              : e.target.value
                          )
                        }
                        onKeyPress={handleEnter}
                        variant="standard"
                        sx={{
                          pr: 2,
                          '& .MuiInput-root:before': {
                            borderBottomColor: theme.palette.divider,
                          },
                        }}
                      />
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Stack direction="row" sx={{ py: 2, ml: -1 }}>
                          <IconButton
                            sx={{ opacity: 0.5 }}
                            size="medium"
                            color="secondary"
                          >
                            <ImageIcon />
                          </IconButton>
                          {/* <Grid item>
                              <IconButton
                                ref={anchorElEmoji}
                                aria-describedby={emojiId}
                                onClick={handleOnEmojiButtonClick}
                                sx={{ opacity: 0.5 }}
                                size="medium"
                                color="secondary"
                              >
                                <SentimentSatisfiedAltIcon />
                              </IconButton>
                              <Popper
                                id={emojiId}
                                open={emojiOpen}
                                anchorEl={anchorElEmoji}
                                disablePortal
                                popperOptions={{
                                  modifiers: [
                                    {
                                      name: 'offset',
                                      options: {
                                        offset: [-20, 20],
                                      },
                                    },
                                  ],
                                }}
                              >
                                <ClickAwayListener
                                  onClickAway={handleCloseEmoji}
                                >
                                  <>
                                    {emojiOpen && (
                                      <MainCard elevation={8} content={false}>
                                        <Picker
                                          onEmojiClick={onEmojiClick}
                                          skinTone={SKIN_TONE_MEDIUM_DARK}
                                          disableAutoFocus
                                        />
                                      </MainCard>
                                    )}
                                  </>
                                </ClickAwayListener>
                              </Popper>
                            </Grid> */}
                          {/* <IconButton
                              sx={{ opacity: 0.5 }}
                              size="medium"
                              color="secondary"
                            >
                              <SoundOutlined />
                            </IconButton> */}
                        </Stack>
                        <IconButton
                          color="primary"
                          onClick={handleOnSend}
                          size="large"
                          sx={{ mr: 1.5 }}
                        >
                          <SendIcon />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
            {/* )} */}

            {/* {matchDownMD && (
                <Dialog
                  onClose={handleToggleChat}
                  open={viewChat}
                  scroll="body"
                >
                  <Grid
                          container
                          justifyContent="space-between"
                          alignItems={'center'}
                        >
                          <Grid item>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <Stack direction={'row'} alignItems={'center'}>
                                <Typography variant="subtitle1">
                                  Trò chuyện
                                </Typography>
                              </Stack>
                            </Stack>
                          </Grid>
                        </Grid>
                </Dialog>
              )} */}
          </Grid>
          {/* </Main> */}
        </Box>
      </Container>
    </Box>
  );
};

export default TaskDetail;
