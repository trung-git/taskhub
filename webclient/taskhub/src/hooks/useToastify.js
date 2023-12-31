import { Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const useToastify = () => {
  const theme = useTheme();
  function toastError(message) {
    toast.error(message, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    });
  }

  function toastInfo(message) {
    toast.info(message, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    });
  }

  function toastLinkInfo(message, link) {
    toast.info(
      <Typography component={Link} to={link} sx={{ textDecoration: 'none' }}>
        {message}
      </Typography>,
      {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      }
    );
  }

  function toastSuccess(message) {
    toast.success(message, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    });
  }

  function toastWarning(message) {
    toast.warning('message', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    });
  }

  return { toastError, toastInfo, toastSuccess, toastWarning, toastLinkInfo };
};

export default useToastify;
