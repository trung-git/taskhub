import { Box, Container } from '@mui/material';
import { useParams } from 'react-router';
import NavBar from '../Home/NavBar';
import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../provider/LoginContext';
import axios from 'axios';
import { API_URL } from '../../base/config';
import useLogin from '../../hooks/useLogin';

const TaskDetail = () => {
  const { isLogin } = useContext(LoginContext);
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

  return (
    <Box sx={{ width: '100%' }}>
      <NavBar isLogin={isLogin} />
      <Container maxWidth="lg" sx={{ mt: 3 }}></Container>
    </Box>
  );
};

export default TaskDetail;
