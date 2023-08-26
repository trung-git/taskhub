import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

import logo from '../../../assets/img/logo/logo.png';
import logo_horizontal from '../../../assets/img/logo/logo_horizontal.png';
import logo_vertical from '../../../assets/img/logo/logo_vertical.png';
import React from 'react';

import TaskAltIcon from '@mui/icons-material/TaskAlt';

const Logo = (props) => {
  const { type = 'horizontal', size } = props;
  const navigate = useNavigate();

  const widthLogo = size
    ? size.width
    : type === 'horizontal'
    ? 146
    : type === 'vertical'
    ? 150
    : 40;
  const heightLogo = size
    ? size.height
    : type === 'horizontal'
    ? 60
    : type === 'vertical'
    ? 150
    : 40;

  return (
    <Box width={widthLogo} height={heightLogo} sx={{ cursor: 'pointer' }}>
      {type === 'only' ? (
        <img
          style={{ width: '100%', objectFit: 'cover', height: '100%' }}
          src={logo}
          alt="logo"
          onClick={() => navigate('/')}
        />
      ) : type === 'horizontal' ? (
        <img
          style={{ width: '100%', objectFit: 'cover', height: '100%' }}
          src={logo_horizontal}
          alt="logo"
          onClick={() => navigate('/')}
        />
      ) : (
        <img
          style={{ width: '100%', objectFit: 'cover', height: '100%' }}
          src={logo_vertical}
          alt="logo"
          onClick={() => navigate('/')}
        />
      )}
    </Box>
    // <Button
    //   variant="text"
    //   onClick={() => navigate('/')}
    //   disableRipple
    //   disableElevation
    //   disableFocusRipple
    //   disableTouchRipple
    //   sx={{ textTransform: 'none' }}
    // >
    //   <Stack direction={'row'} spacing={1} alignItems={'center'}>
    //     <Box
    //       sx={{
    //         //   backgroundColor: 'red',
    //         display: 'flex',
    //         flexDirection: 'row',
    //         borderRadius: '4px',
    //         //   border: '1px solid grey',
    //       }}
    //     >
    //       <Typography color={'red'} fontSize={'24px'} sx={{ px: 1 }}>
    //         Task
    //       </Typography>
    //       <Box
    //         sx={{
    //           backgroundColor: 'green',
    //           borderRadius: '4px',
    //           px: 1,
    //           color: 'white',
    //           display: 'flex',
    //           alignItems: 'center',
    //           fontSize: '24px',
    //           fontWeight: 'bold',
    //         }}
    //       >
    //         HUB
    //       </Box>
    //     </Box>
    //     <TaskAltIcon sx={{ color: 'green' }} fontSize="large" />
    //   </Stack>
    // </Button>
  );
};

export const TaskHubLogo = React.memo(Logo);
