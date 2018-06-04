import React from 'react';
import { StackNavigator } from 'react-navigation';
import { TouchableOpacity, Text } from 'react-native';
import Auth from '../containers/Auth';
import Search from '../components/Search';
import CreateOrJoinTeam from '../containers/CreateOrJoinTeam';
import AddPlayers from '../containers/AddPlayers';
import Profile from '../containers/Profile';
import TeamName from '../components/TeamName';
import TeamNameContainer from '../containers/TeamNameContainer';
import CreateRoom from '../containers/CreateRoom';
import Room from '../containers/Room';
import TabNavigator from '../containers/TabNavigator';
import AddObserver from '../containers/AddObserver';
import SetLocation from '../containers/SetLocation';
import Tst from '../containers/Tst';

const Screens = StackNavigator({
  tst: {
    screen: Tst,
  },
  Login: {
    screen: Auth,
    navigationOptions: {
      title: 'Login',
    },
  },
  SetLocation: {
    screen: SetLocation,
  },
  CreateTeamStepOne: {
    screen: AddPlayers,
    navigationOptions: {
      title: 'Add Players',
      // headerLeft: (
      //   <TouchableOpacity>
      //     <Text>cancel</Text>
      //   </TouchableOpacity>
      // ),
    },
  },
  AddObserver: {
    screen: AddObserver,
    navigationOptiosssns: {
      title: 'Add Observer',
    },
  },
  SignUp: {
    screen: Auth,
    navigationOptiosssns: {
      title: 'Register',
    },
  },
  Room: {
    screen: Room,
    navigationOptions: {
      title: 'Room',
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Profile',
      // headerLeft: null,
    },
  },
  CreateRoom: {
    screen: CreateRoom,
    navigationOptions: {
      title: 'Room Settings',
    },
  },

  CreateTeamStepTwo: {
    screen: TeamNameContainer,
    navigationOptions: {
      title: 'Team Name',
      // headerLeft: (
      //   <TouchableOpacity>
      //     <Text>cancel</Text>
      //   </TouchableOpacity>
      // ),
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
    screen: CreateOrJoinTeam,
  },
});
export default Screens;
