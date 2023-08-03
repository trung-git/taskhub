import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { TaskHubLogo } from '../../base/component/TaskHubLogo';
import { navBarHeight } from '../../base/config';
import { Step, StepButton, Stepper, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { AccountCircle } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import MessageIcon from '@mui/icons-material/Message';
import LanguageSwitch from '../../base/component/LanguageSwitch';

function NavBarStepper({ curStep }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  const steps = [
    'th_key_finding_step_describe',
    'th_key_finding_step_taskerlist',
    'th_key_finding_step_choosingdate',
    'th_key_finding_step_booking',
  ];
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  React.useEffect(() => {
    if (curStep) {
      setActiveStep(curStep);
      let newComplete = completed;
      Object.keys(newComplete).forEach((step) => {
        newComplete[step] = step < curStep ? true : false;
      });
      setCompleted(newComplete);
    }
  }, [curStep, completed]);

  console.log('curStep', curStep);

  return (
    <AppBar
      position="sticky"
      sx={{
        height: navBarHeight,
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Container maxWidth="lg" sx={{ height: '100%' }}>
        <Toolbar disableGutters sx={{ height: '100%' }}>
          <TaskHubLogo />

          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <Stepper
              color="success"
              activeStep={activeStep}
              sx={{
                '& .MuiStepIcon-root': {
                  color: 'grey',
                },
                '& .MuiStepLabel-label.Mui-active': {
                  color: 'green',
                  fontWeight: 600,
                },
                '& .MuiStepLabel-label.Mui-completed': {
                  color: 'green',
                  fontWeight: 600,
                },
                '.MuiSvgIcon-root.Mui-active': {
                  color: 'green',
                },
                '.MuiSvgIcon-root.Mui-completed': {
                  color: 'green',
                },
              }}
            >
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit">{t(label)}</StepButton>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBarStepper;
