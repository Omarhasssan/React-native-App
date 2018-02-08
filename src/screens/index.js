import { StackNavigator } from 'react-navigation';
import Auth from '../containers/Auth';
// import SignUp from '../containers/Signup';
// import SignIn from '../containers/SignIn';

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
