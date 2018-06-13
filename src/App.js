import React, { Component } from 'react';
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
    this.props.getRooms();
    this.props.getTeams();
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
  getTeams() {
    dispatch(getTeams());
  },
  getRooms() {
    dispatch(getRooms());
  },

  dispatch,
});

const AppWithNavigation = connect(mapStateToProps, mapDispatchToProps)(App);
export default () => (
  <Provider store={configureStore()}>
    <AppWithNavigation />
  </Provider>
);
