import { lazy } from 'react';

// project import
import Loadable from '../base/component/Loadable';

// render - login
const AuthLogin = Loadable(
  lazy(() => import('../components/authentication/Login'))
);
const AuthRegister = Loadable(
  lazy(() => import('../components/authentication/Register'))
);

const AuthForgotPassword = Loadable(
  lazy(() => import('../components/authentication/ForgotPassword'))
);

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <></>,
  children: [
    {
      path: 'login',
      element: <AuthLogin />,
    },
    {
      path: 'register',
      element: <AuthRegister />,
    },
    {
      path: 'forgotpassword',
      element: <AuthForgotPassword />,
    },
  ],
};

export default LoginRoutes;
