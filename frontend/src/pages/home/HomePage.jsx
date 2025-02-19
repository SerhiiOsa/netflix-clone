import { useAuthUserStore } from '../../store/authUser.js';
import AuthScreen from './AuthScreen.jsx';
import HomeScreen from './HomeScreen.jsx';

const HomePage = () => {
  const { user } = useAuthUserStore();

  return user ? <HomeScreen /> : <AuthScreen />;
};

export default HomePage;
