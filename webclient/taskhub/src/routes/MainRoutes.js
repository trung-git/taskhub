import { lazy } from 'react';

// import SignInSide from './components/SignIn';
// import SignUp from './components/SignUp';
import Home from '../components/Home';
import Chat from '../components/Chat';
import AuthLogin from '../components/authentication/Login';
import AuthRegister from '../components/authentication/Register';

// project import
import Loadable from '../base/component/Loadable';
import Finding from '../components/Finding';
import UserPage from '../components/UserPage';
import TaskList from '../components/TaskList';
import TaskDetail from '../components/TaskDetail';

// const Finding = Loadable(lazy(() => import('../components/Finding')));

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
