// import SignInSide from './components/SignIn';
// import SignUp from './components/SignUp';
import Home from '../components/Home';
import Chat from '../components/Chat';
import AuthLogin from '../components/authentication/Login';
import AuthRegister from '../components/authentication/Register';

// project import
// import Loadable from '../base/component/Loadable';
import Finding from '../components/Finding';

// const AuthLogin = Loadable(
//   lazy(() => import('../components/authentication/Login'))
// );
// const AuthRegister = Loadable(
//   lazy(() => import('../components/authentication/Register'))
// );

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
  ],
};

export default MainRoutes;
