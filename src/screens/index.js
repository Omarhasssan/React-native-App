import React from 'react';
import { StackNavigator } from 'react-navigation';
import { TouchableOpacity, Text } from 'react-native';
import Auth from '../containers/Auth';
import Search from '../components/Search';
import StepOneContainer from '../containers/StepOneContainer';
import AddPlayers from '../containers/AddPlayers';
import Profile from '../containers/Profile';
import TeamName from '../components/TeamName';
import TeamNameContainer from '../containers/TeamNameContainer';

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
    navigationOptiosssns: {
      title: 'Register',
    },
  },
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

  CreateTeamStepTwo: {
    screen: TeamNameContainer,
    navigationOptions: {
      title: 'Team Name',
      headerLeft: (
        <TouchableOpacity>
          <Text>cancel</Text>
        </TouchableOpacity>
      ),
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Profile',
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
  },
});
export default Screens;
