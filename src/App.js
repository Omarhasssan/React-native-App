import React, { Component } from 'react';

import { connect } from 'react-redux';
import Screens from './screens';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import {
  checkIfWeKnowThisUserBefore,
  getTeams,
  getRooms,
  handleNotificationClick,
} from '../src/actions';
import Spinner from './components/Spinner';
import withHandleNotification from './hocs/withHandleNotification';
class App extends Component {
  state = {
    dataLoaded: true,
  };

  componentDidMount() {
    //  check if user is registered before load his data
    this.props.checkIfWeKnowThisUserBefore();
    this.props.getRooms();
    this.props.getTeams();
  }

  componentWillReceiveProps(nextProps) {
    nextProps.rooms && nextProps.teams ? this.setState({ dataLoaded: true }) : null;
  }
  componentWillUnmount() {
    console.log('app unmount');
  }
  render() {
    //console.disableYellowBox = true;
    const { navigation } = this.props;
    const { dataLoaded } = this.state;
    if (!dataLoaded) return <Spinner />;
    return dataLoaded && <Screens navigation={navigation} />;
  }
}

const mapStateToProps = ({ nav, teamsReducer, roomsReducer, notificationHandler, auth }) => ({
  nav,
  teams: teamsReducer,
  rooms: roomsReducer.rooms,
  notificationHandler,
  user: auth.user,
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
  onNotificationClick(notification) {
    console.log('onNotificationClick');
    dispatch(handleNotificationClick(notification));
  },

  dispatch,
});

const AppWithNavigation = connect(mapStateToProps, mapDispatchToProps)(withHandleNotification(App));
export default () => (
  <Provider store={configureStore()}>
    <AppWithNavigation />
  </Provider>
);
