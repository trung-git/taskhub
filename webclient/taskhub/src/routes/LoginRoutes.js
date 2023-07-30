import { lazy } from 'react';

// project import
import Loadable from '../base/component/Loadable';
// import MinimalLayout from 'layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(
  lazy(() => import('../components/authentication/Login'))
);
const AuthRegister = Loadable(
  lazy(() => import('../components/authentication/Register'))
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
  ],
};

export default LoginRoutes;
