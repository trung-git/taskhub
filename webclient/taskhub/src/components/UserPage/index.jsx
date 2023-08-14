import { Box, Container, Grid } from '@mui/material';
import { Outlet } from 'react-router';

import ProfileTabs from './ProfileTabs';
import ProfileCard from './ProfileCard';
import { useContext, useRef } from 'react';
import { LoginContext } from '../../provider/LoginContext';
import NavBar from '../Home/NavBar';

const UserPage = () => {
  const inputRef = useRef(null);
  const { isLogin } = useContext(LoginContext);

  const focusInput = () => {
    inputRef.current?.focus();
  };
  return (
    <Box sx={{ width: '100%' }}>
      <NavBar isLogin={isLogin} />
      <Container maxWidth="lg" sx={{ height: '100%' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ProfileCard focusInput={focusInput} />
          </Grid>
          <Grid item xs={12} md={4}>
            <ProfileTabs focusInput={focusInput} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Outlet context={inputRef} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UserPage;
