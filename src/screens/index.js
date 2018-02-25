import React from 'react';
import { StackNavigator } from 'react-navigation';
import { TouchableOpacity, Text } from 'react-native';
import Auth from '../containers/Auth';
import Search from '../components/Search';
import StepOneContainer from '../containers/StepOneContainer';
import AddPlayers from '../containers/AddPlayers';

const Screens = StackNavigator({
  CreateTeamStepOne: {
    screen: AddPlayers,
    navigationOptions: {
      title: 'Add Players',
      headerLeft: (
        <TouchableOpacity>
          <Text>cancel</Text>
        </TouchableOpacity>
      ),
    },
  },

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

  JoinTeam: {
    screen: Search,
    navigationOptions: {
      title: 'Join Team',
      headerRight: (
        <TouchableOpacity>
          <Text>Join</Text>
        </TouchableOpacity>
      ),
    },
  },
  Setup: {
    screen: StepOneContainer,
    navigationOptions: {
      title: 'Setup',
      headerLeft: null,
    },
  },
});
export default Screens;
