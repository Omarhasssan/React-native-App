import React, { Component } from 'react';
// import io from 'socket.io-client/dist/socket.io';
import firebase from './config/firebase';

import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import Screens from './screens';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import {
  checkIfWeKnowThisUserBefore,
  getTeams,
  listenToTeamRequestStatus,
  getRooms,
} from '../src/actions';
import Spinner from './components/Spinner';
import { DBHelpers } from '../src/helpers';
const middleware = createReactNavigationReduxMiddleware('root', state => state.nav);
const addListener = createReduxBoundAddListener('root');
class App extends Component {
  state = {
    dataLoaded: false,
  };

  componentDidMount() {
    //  check if user is registered before load his data
    this.props.checkIfWeKnowThisUserBefore();
    // load teams
    this.props.loadTeams();
    // load Rooms
    this.props.getRooms();
    /*
    *LISTEN TO TEAM REQUEST STATUS 
    *WHEN IT CHANGES TO ACCEPTED 
    *ADD USER TO TARGET TEAM
    */
    this.props.listenToTeamRequestStatus();
  }
  componentWillReceiveProps(nextProps) {
    nextProps.teams && nextProps.rooms ? this.setState({ dataLoaded: true }) : null;
  }
  componentWillUnmount() {
    console.log('app unmount');
  }
  render() {
    console.disableYellowBox = true;
    const { dispatch, nav, teams } = this.props;
    const { dataLoaded } = this.state;
    if (!dataLoaded) return <Spinner />;
    return (
      dataLoaded && (
        <Screens
          navigation={addNavigationHelpers({
            dispatch,
            state: nav,
            addListener,
          })}
        />
      )
    );
  }
}

const mapStateToProps = ({ nav, teamsReducer, roomsReducer }) => ({
  nav,
  teams: teamsReducer,
  rooms: roomsReducer.rooms,
});

const mapDispatchToProps = dispatch => ({
  checkIfWeKnowThisUserBefore() {
    dispatch(checkIfWeKnowThisUserBefore());
  },
  loadTeams() {
    dispatch(getTeams());
  },
  getRooms() {
    dispatch(getRooms());
  },
  listenToTeamRequestStatus() {
    dispatch(listenToTeamRequestStatus());
  },
  dispatch,
});

const AppWithNavigation = connect(mapStateToProps, mapDispatchToProps)(App);
export default () => (
  <Provider store={configureStore()}>
    <AppWithNavigation />
  </Provider>
);
