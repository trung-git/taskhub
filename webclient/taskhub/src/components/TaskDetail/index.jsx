import {
  Box,
  Container,
  Grid,
  Skeleton,
  fabClasses,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useParams } from 'react-router';
import NavBar from '../Home/NavBar';
import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../provider/LoginContext';
import axios from 'axios';
import { API_URL } from '../../base/config';
import useLogin from '../../hooks/useLogin';
import ChatScreen from './ChatScreen';
import useToastify from '../../hooks/useToastify';
import TaskViewDetail from './TaskViewDetail';
import diffProperties from '../../utils/diffProperties';

const TaskDetail = () => {
  const { isLogin, currentUser } = useContext(LoginContext);
  const params = useParams();
  const id = params?.id;
  const [loading, setLoading] = useState(false);
  const [taskData, setTaskData] = useState(null);
  const { getUserToken } = useLogin();
  const token = getUserToken();
  const { toastError, toastSuccess } = useToastify();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchData = async (id) => {
    setLoading(true);
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
      window.dispatchEvent(new ErrorEvent('error', { error }));
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const theme = useTheme();

  const matchDownSM = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const [chatId, setChatId] = useState('');

  const handleUpdateTask = async (task) => {
    setIsSubmitting(true);
    const taskUpdateValue = {
      address: task?.address,
      paymentPlan: task?.paymentPlan,
      paymentType: task?.paymentType,
      price: task?.price,
      description: task?.description,
      workTime: {
        from: task?.workTimeFrom,
        to: task?.workTimeTo,
      },
    };
    try {
      const response = await axios.patch(
        `${API_URL}api/v1/contract/${id}`,
        taskUpdateValue,
        config
      );
      const responseData = response.data.data;
      console.log('User updated successfully:', response);
      console.log('testProps', diffProperties(taskData, responseData));
      setTaskData(responseData);
      toastSuccess('Update task success');
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error updating user:', error);
      toastError(`Update task error, ${error.message}`);
      window.dispatchEvent(new ErrorEvent('error', { error }));
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <NavBar isLogin={isLogin} />
      <Container maxWidth="lg" sx={{ mt: 3, height: 'calc(100vh - 116px)' }}>
        <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
          <Grid container sx={{ height: '100%', justifyContent: 'center' }}>
            <Grid item xs={12} md={6} xl={6} height={'100%'}>
              {taskData && (
                <TaskViewDetail
                  task={taskData}
                  onSubmit={handleUpdateTask}
                  isSubmitting={isSubmitting}
                  onRefresh={() => fetchData(id)}
                  isLoading={loading}
                  setIsSubmitting={setIsSubmitting}
                />
              )}
            </Grid>
            {taskData && taskData?.status !== 'invitation' && (
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
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default TaskDetail;
