import { lazy } from 'react';

import Home from '../components/Home';
import Chat from '../components/Chat';
import AuthLogin from '../components/authentication/Login';
import AuthRegister from '../components/authentication/Register';
import AuthForgotPassword from '../components/authentication/ForgotPassword';
import AuthResetPassword from '../components/authentication/ResetPassword';

// project import
import Loadable from '../base/component/Loadable';
import Finding from '../components/Finding';
import UserPage from '../components/UserPage';
import TaskList from '../components/TaskList';
import TaskDetail from '../components/TaskDetail';
import PostList from '../components/PostList';

const UserTabPersonal = Loadable(
  lazy(() => import('../components/UserPage/TabPersonal'))
);
const UserTabPayment = Loadable(
  lazy(() => import('../components/UserPage/TabPayment'))
);
const UserTabPassword = Loadable(
  lazy(() => import('../components/UserPage/TabPassword'))
);
const UserTabSettings = Loadable(
  lazy(() => import('../components/UserPage/TabSettings'))
);

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <Home />,
    },
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
    {
      path: '/reset-password/:token',
      element: <AuthResetPassword />,
    },
    {
      path: 'chat',
      element: <Chat />,
    },
    {
      path: 'find/:id',
      element: <Finding />,
    },
    {
      path: 'tasklist',
      element: <TaskList />,
    },
    {
      path: 'tasklist/:id',
      element: <TaskDetail />,
    },
    {
      path: 'post',
      element: <PostList />,
    },
    {
      path: 'profile',
      element: <UserPage />,
      children: [
        {
          path: 'personal',
          element: <UserTabPersonal />,
        },
        {
          path: 'payment',
          element: <UserTabPayment />,
        },
        {
          path: 'password',
          element: <UserTabPassword />,
        },
        {
          path: 'settings',
          element: <UserTabSettings />,
        },
      ],
    },
  ],
};

export default MainRoutes;
