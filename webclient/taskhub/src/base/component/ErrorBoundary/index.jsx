import React, { useState, useEffect, useContext } from 'react';
import useLogin from '../../../hooks/useLogin';
import { LoginContext } from '../../../provider/LoginContext';
import useToastify from '../../../hooks/useToastify';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);
  const { logOut } = useLogin();
  const { setIsLogin, setCurrentUser } = useContext(LoginContext);
  const { toastError } = useToastify();
  const navigate = useNavigate();

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      console.log('errorInfoerror', error, errorInfo);

      // Bạn có thể thêm logic xử lý lỗi tùy chỉnh ở đây
      // Ví dụ, kiểm tra xem lỗi liên quan đến Axios và có mã trạng thái là 401 không
      if (
        error.error.response &&
        error.error.response.status === 500 &&
        error.error.response.data.message === 'jwt expired'
      ) {
        console.log('expiretoken');
        logOut();
      }

      setHasError(true);
      setError(error);
      setErrorInfo(errorInfo);
      toastError(`Phiên đăng nhập đã hết hạn vui lòng đăng nhập lại`);
    };

    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div>
        <h1>Phiên đăng nhập đã hết hạn</h1>
        <Button
          onClick={() => {
            setHasError(false);
            navigate('/');
          }}
          variant="contained"
        >
          Back To Home
        </Button>
      </div>
    );
  }

  return children;
}

export default ErrorBoundary;
