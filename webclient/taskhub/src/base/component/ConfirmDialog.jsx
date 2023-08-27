import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
} from '@mui/material';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDialog = ({
  isOpenDialog,
  onClose,
  onAgree,
  onDisAgree,
  title,
  content,
}) => {
  const { t } = useTranslation();

  const handleClose = () => {
    onClose && onClose();
  };

  const handleOnAgree = () => {
    onAgree && onAgree();
  };

  const handleOnDisagree = () => {
    onDisAgree ? onDisAgree() : handleClose();
  };

  return (
    <Dialog
      open={isOpenDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Transition}
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h5">{t(title)}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t(content)}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', px: 2, mt: 2 }}>
        <Button onClick={handleOnDisagree} variant="outlined" color="error">
          {t('th_key_btn_cancel')}
        </Button>
        <Button onClick={handleOnAgree} autoFocus variant="contained">
          {t('th_key_btn_confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
