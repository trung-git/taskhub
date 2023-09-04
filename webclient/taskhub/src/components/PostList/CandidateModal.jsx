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
import ImagesList from '../../base/component/ImagesList';
import { LoadingButton } from '@mui/lab';

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

const CandidateModal = ({
  candidateInfo,
  candidateList,
  onClose,
  onSendInvitation,
  isSendInvitation,
  isCanInvitation,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [expanded, setExpanded] = useState();

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
                      alt={candidateInfo[index]?.username}
                      src={candidateInfo[index]?.image}
                      sx={{ width: 50, height: 50 }}
                    />
                    <Typography fontWeight={'bold'}>
                      {[
                        candidateInfo[index]?.firstName,
                        candidateInfo[index]?.lastName,
                      ].join(' ')}
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <Typography fontWeight={'bold'}>
                        {t('th_post_suggest_price')}:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography>{_candidate.price} VND</Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} sx={{ mt: 1, mb: 2 }}>
                    <Grid item xs={3}>
                      <Typography fontWeight={'bold'}>
                        {t('th_post_intro_seft_to_post')}:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography>{_candidate.text}</Typography>
                    </Grid>
                  </Grid>
                  <Stack
                    sx={{ my: 2, justifyContent: 'flex-end', width: '100%' }}
                  >
                    <LoadingButton
                      disabled={!isCanInvitation}
                      loading={isSendInvitation}
                      variant="contained"
                      color="primary"
                      sx={{ width: 'fit-content' }}
                      onClick={() => {
                        onSendInvitation && onSendInvitation(_candidate?.user);
                      }}
                    >
                      {t('th_key_btn_send_invitation')}
                    </LoadingButton>
                  </Stack>
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
                        alt={candidateInfo[index]?.username}
                        src={candidateInfo[index]?.image}
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
                            {`${candidateInfo[index]?.firstName} ${candidateInfo[index]?.lastName}`}
                          </Typography>
                        </Stack>
                        <Stack
                          direction={'row'}
                          marginTop={1}
                          alignItems={'center'}
                        >
                          {candidateInfo[index]?.averageRating ? (
                            <Typography
                              sx={{ mr: 0.5 }}
                            >{`(${candidateInfo[index]?.averageRating})`}</Typography>
                          ) : (
                            <Typography sx={{ mr: 0.5 }}>{`(${t(
                              'th_key_not_reated_yet'
                            )})`}</Typography>
                          )}
                          <Rating
                            name="tasker-rating"
                            value={candidateInfo[index]?.averageRating}
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
                        {candidateInfo[index]?.aboutMe}
                      </Typography>

                      <Typography fontSize={18} fontWeight={600} mt={1}>
                        {t('th_key_how_i_can_help')}:
                      </Typography>
                      <Typography fontSize={14} textAlign={'justify'}>
                        {candidateInfo[index]?.skillAndExperience}
                      </Typography>
                    </Box>
                    {candidateInfo[index]?.photos?.length > 0 && (
                      <>
                        <Typography
                          fontSize={18}
                          fontWeight={600}
                          mt={1}
                          mb={1}
                        >
                          {t('th_key_workphotos')}:
                        </Typography>
                        <ImagesList imagesList={candidateInfo[index]?.photos} />
                      </>
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
          {t('th_key_btn_close')}
        </Button>
      </DialogActions>
    </MainCard>
  );
};

export default CandidateModal;
