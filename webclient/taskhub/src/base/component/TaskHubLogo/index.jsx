import { Box } from '@mui/material';
import { useNavigate } from 'react-router';

import logo from '../../../assets/img/logo/logo.png';
import logo_horizontal from '../../../assets/img/logo/logo_horizontal.png';
import logo_vertical from '../../../assets/img/logo/logo_vertical.png';
import React from 'react';

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
  );
};

export const TaskHubLogo = React.memo(Logo);
