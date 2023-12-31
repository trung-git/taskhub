import PropTypes from 'prop-types';

// material-ui
import { Box, Grid } from '@mui/material';

// project import
import AuthCard from './AuthCard';
// import Logo from 'components/Logo';
import { TaskHubLogo } from '../../base/component/TaskHubLogo';
// import AuthFooter from 'components/cards/AuthFooter';

// assets
import AuthBackground from '../../assets/img/auth/AuthBackground';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
  <Box sx={{ minHeight: '100vh' }}>
    <AuthBackground />
    <Box sx={{ height: 0, position: 'relative' }}>
      <Box sx={{ position: 'absolute', left: 0 }}>
        <TaskHubLogo type="vertical" size={{ width: 100, height: 100 }} />
      </Box>
    </Box>
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      sx={{
        height: '100%',
      }}
    >
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' },
          }}
        >
          <Grid item>
            <AuthCard>{children}</AuthCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        {/* <AuthFooter /> */}
      </Grid>
    </Grid>
  </Box>
);

AuthWrapper.propTypes = {
  children: PropTypes.node,
};

export default AuthWrapper;
