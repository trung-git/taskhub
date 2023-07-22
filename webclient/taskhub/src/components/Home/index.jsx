import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LoginContext } from '../../provider/LoginContext';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import NavBar from './NavBar';
import SearchHome from './SearchHome';
import { useTranslation } from 'react-i18next';
import PopularTask from './PopularTask';

const Home = () => {
  const navigate = useNavigate();
  const logincontext = useContext(LoginContext);
  const { isLogin } = useContext(LoginContext);
  const { t } = useTranslation();

  console.log('logincontext', logincontext);

  // useEffect(() => {
  //   if (!isLogin) {
  //     console.log('back to home');
  //     navigate('/signin');
  //   }
  // }, [isLogin, navigate]);

  return (
    <Box sx={{ width: '100%' }}>
      <NavBar />
      <SearchHome />
      <PopularTask />
    </Box>
  );
};

export default Home;
