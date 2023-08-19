import Verify from './components/Verify';
import { AuthProvider, AuthContext } from './provider/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Verify />
    </AuthProvider>
  );
};

export default App;
