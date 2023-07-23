import { useParams } from 'react-router';
import NavBarStepper from './NavBarStepper';
import { Box } from '@mui/material';

const Finding = (props) => {
  const params = useParams();

  const id = params.id;
  console.log('idFinding', id);
  return (
    <Box sx={{ width: '100%' }}>
      <NavBarStepper />
    </Box>
  );
};

export default Finding;
