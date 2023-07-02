import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LoginContext } from '../../provider/LoginContext';
import { Box, Button } from '@mui/material';
import NavBar from './NavBar';

const Home = () => {
  const navigate = useNavigate();
  const logincontext = useContext(LoginContext);
  const { isLogin } = useContext(LoginContext);

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
      {/* <Button
        variant="contained"
        color="error"
        onClick={() => logincontext.setIsLogin(false)}
      >
        Log out
      </Button> */}
    </Box>
  );
};

export default Home;
