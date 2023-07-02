import { Box, Button, Stack, Typography } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useNavigate } from 'react-router';

const TaskHubLogo = (props) => {
  const { size } = props;
  const navigate = useNavigate();

  return (
    <Button
      variant="text"
      onClick={() => navigate('/')}
      disableRipple
      disableElevation
      disableFocusRipple
      disableTouchRipple
      sx={{ textTransform: 'none' }}
    >
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <Box
          sx={{
            //   backgroundColor: 'red',
            display: 'flex',
            flexDirection: 'row',
            borderRadius: '4px',
            //   border: '1px solid grey',
          }}
        >
          <Typography color={'red'} fontSize={'24px'} sx={{ px: 1 }}>
            Task
          </Typography>
          <Box
            sx={{
              backgroundColor: 'green',
              borderRadius: '4px',
              px: 1,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            HUB
          </Box>
        </Box>
        <TaskAltIcon sx={{ color: 'green' }} fontSize="large" />
      </Stack>
    </Button>
  );
};

export default TaskHubLogo;
