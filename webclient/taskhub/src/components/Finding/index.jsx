import { useParams } from 'react-router';
import NavBarStepper from './NavBarStepper';
import { Box, Container } from '@mui/material';
import { useState } from 'react';

const Finding = (props) => {
  const params = useParams();
  const [activeStep, setActiveStep] = useState(2);

  const id = params.id;
  console.log('idFinding', id);
  return (
    <Box sx={{ width: '100%' }}>
      <NavBarStepper curStep={activeStep} />
      <Container maxWidth="xl" sx={{ height: '100%' }}></Container>
    </Box>
  );
};

export default Finding;
