import { useEffect, useState, ChangeEvent } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {
  Avatar,
  Box,
  Button,
  DialogActions,
  Grid,
  Rating,
  Stack,
  useTheme,
} from '@mui/material';
import MainCard from '../../base/component/MainCard';
import { useTranslation } from 'react-i18next';
import TaskerCard from '../Finding/TaskerCard';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const CandidateModal = ({ candidateList, onClose }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [expanded, setExpanded] = useState(0);

  console.log('candidateList', candidateList);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <MainCard
      sx={{
        height: 1,
        '& .MuiCardContent-root': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 0,
        },
      }}
      title={t('th_post_candidate_list')}
    >
      <Box
        sx={{
          maxHeight: 600,
          overflowY: 'scroll',
        }}
      >
        {candidateList?.length > 0 &&
          candidateList?.map((_candidate, index) => {
            return (
              <Accordion
                key={index}
                expanded={expanded === index}
                onChange={handleChange(index)}
                defaultExpanded={false}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Stack direction={'row'} alignItems={'center'} spacing={2}>
                    <Avatar
                      alt={_candidate?.user?.username}
                      src={_candidate?.user?.image}
                      sx={{ width: 50, height: 50 }}
                    />
                    <Typography fontWeight={'bold'}>
                      {[
                        _candidate?.user?.firstName,
                        _candidate?.user?.lastName,
                      ].join(' ')}
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <Typography fontWeight={'bold'}>
                        {t('Giá đề xuất')}:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography>{_candidate.price} VND</Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} sx={{ mt: 1, mb: 2 }}>
                    <Grid item xs={3}>
                      <Typography fontWeight={'bold'}>
                        {t('Tôi có thể giúp gì')}:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography>{_candidate.text}</Typography>
                    </Grid>
                  </Grid>
                  {/* <TaskerCard taskerData={_candidate?.user} /> */}
                  <Box
                    sx={{
                      width: '100%',
                      bgcolor: 'background.paper',
                      border: '2px solid #f0f0f0',
                      borderRadius: 4,
                      boxShadow: 24,
                      p: 4,
                    }}
                  >
                    <Stack direction={'row'}>
                      <Avatar
                        alt={_candidate?.user?.username}
                        src={_candidate?.user?.image}
                        sx={{ width: 80, height: 80 }}
                      />
                      <Stack
                        direction={'column'}
                        alignItems={'flex-start'}
                        sx={{ flex: 1, ml: 2 }}
                      >
                        <Stack
                          direction={'row'}
                          justifyContent={'space-between'}
                          sx={{ width: '100%' }}
                        >
                          <Typography
                            variant="h5"
                            fontWeight={600}
                            sx={{ color: '#4a4a4a' }}
                          >
                            {`${_candidate?.user?.firstName} ${_candidate?.user?.lastName}`}
                          </Typography>
                        </Stack>
                        <Stack direction={'row'} marginTop={1}>
                          <Typography
                            sx={{ mr: 0.5 }}
                          >{`(${_candidate?.user?.averageRating})`}</Typography>
                          <Rating
                            name="tasker-rating"
                            value={_candidate?.user?.averageRating}
                            readOnly
                            precision={0.1}
                            sx={{
                              '& .MuiRating-iconFilled': {
                                color: 'green',
                              },
                            }}
                          />
                        </Stack>
                      </Stack>
                    </Stack>

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        mt: 1,
                        alignItems: 'flex-start',
                      }}
                    >
                      <Typography fontSize={18} fontWeight={600}>
                        {t('th_key_about_me')}:
                      </Typography>
                      <Typography fontSize={14} textAlign={'justify'}>
                        {_candidate?.user?.aboutMe}
                      </Typography>

                      <Typography fontSize={18} fontWeight={600} mt={1}>
                        {t('th_key_how_i_can_help')}:
                      </Typography>
                      <Typography fontSize={14} textAlign={'justify'}>
                        {_candidate?.user?.skillAndExperience}
                      </Typography>
                    </Box>
                    {_candidate?.user?.photos?.length > 0 && (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          mt: 1,
                          alignItems: 'flex-start',
                          width: '100%',
                        }}
                      >
                        <Typography fontSize={18} fontWeight={600}>
                          {t('Work photos')}:
                        </Typography>
                        {/* <ImagesSlider images={taskerData?.photos} /> */}
                      </Box>
                    )}
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </Box>
      <DialogActions sx={{ px: 2.5, py: 2 }}>
        <Button
          color="error"
          onClick={() => {
            onClose && onClose();
          }}
        >
          Close
        </Button>
      </DialogActions>
    </MainCard>
  );
};

export default CandidateModal;
