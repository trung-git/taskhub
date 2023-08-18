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
import ChatScreen from './ChatScreen';

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
      setChatId(responseData.chat);
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

  const handleToggleChat = () => {
    setViewChat((prev) => !prev);
  };

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
            <Grid item xs={12} md={6} xl={6} sx={{ height: '100%' }}>
              <ChatScreen
                chatId={chatId}
                user={currentUser}
                otherUser={
                  taskData?.finder?._id === currentUser?._id
                    ? taskData?.tasker
                    : taskData?.finder
                }
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default TaskDetail;
