import { StackNavigator } from 'react-navigation';
import Auth from '../containers/Auth';

const Screens = StackNavigator({
  SignUp: {
    screen: Auth,
    navigationOptions: {
      title: 'Register',
    },
  },
  Login: {
    screen: Auth,
    navigationOptions: {
      title: 'Login',
    },
  },
});

export default Screens;
