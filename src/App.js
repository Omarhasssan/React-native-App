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
import withHandleNotification from './hocs/withHandleNotification';

import {
  checkIfWeKnowThisUserBefore,
  getTeams,
  listenToTeamRequestStatus,
  getRooms,
  sendJoiningTeamRequest,
  sendNormalJoiningTeamNotification,
  handleNotificationClick,
  loadData,
} from '../src/actions';
import Spinner from './components/Spinner';
import { DBHelpers } from '../src/helpers';
import withLoadData from './hocs/withLoadData';
const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);
const addListener = createReduxBoundAddListener('root');
class App extends Component {
  componentWillUnmount() {
    console.log('app unmount');
  }
  render() {
    //console.disableYellowBox = true;
    const { navigation } = this.props;
    return <Screens navigation={navigation} />;
  }
}

const mapStateToProps = ({ nav, notificationHandler, dataLoaded }) => ({
  nav,
  notificationHandler,
  dataLoaded,
});

const mapDispatchToProps = dispatch => ({
  onNotificationClick(notification) {
    console.log('onNotificationClick');
    dispatch(handleNotificationClick(notification));
  },
  loadData() {
    dispatch(loadData());
  },
  dispatch,
});

const AppWithNavigation = connect(mapStateToProps, mapDispatchToProps)(
  withLoadData(withHandleNotification(App))
);
export default () => (
  <Provider store={configureStore()}>
    <AppWithNavigation />
  </Provider>
);
