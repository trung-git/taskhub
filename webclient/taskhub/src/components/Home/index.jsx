import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LoginContext } from '../../provider/LoginContext';
import { Box } from '@mui/material';
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

  return (
    <Box sx={{ width: '100%' }}>
      <NavBar isLogin={isLogin} />
      <SearchHome />
      <PopularTask />
    </Box>
  );
};

export default Home;
