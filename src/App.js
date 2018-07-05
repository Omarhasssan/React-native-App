import React, { Component } from 'react';

import { connect } from 'react-redux';
import Screens from './screens';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import withHandleNotification from './hocs/withHandleNotification';

import {
  checkIfWeKnowThisUserBefore,
  getTeams,
  getRooms,
<<<<<<< HEAD
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
=======
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
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
  componentWillUnmount() {
    console.log('app unmount');
  }
  render() {
    //console.disableYellowBox = true;
    const { navigation } = this.props;
<<<<<<< HEAD
    return <Screens navigation={navigation} />;
  }
}

const mapStateToProps = ({ nav, notificationHandler, dataLoaded }) => ({
  nav,
  notificationHandler,
  dataLoaded,
=======
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
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
});

const mapDispatchToProps = dispatch => ({
  onNotificationClick(notification) {
    console.log('onNotificationClick');
    dispatch(handleNotificationClick(notification));
  },
  loadData() {
    dispatch(loadData());
  },
<<<<<<< HEAD
  dispatch,
});

const AppWithNavigation = connect(mapStateToProps, mapDispatchToProps)(
  withLoadData(withHandleNotification(App))
);
=======
  onNotificationClick(notification) {
    console.log('onNotificationClick');
    dispatch(handleNotificationClick(notification));
  },

  dispatch,
});

const AppWithNavigation = connect(mapStateToProps, mapDispatchToProps)(withHandleNotification(App));
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
export default () => (
  <Provider store={configureStore()}>
    <AppWithNavigation />
  </Provider>
);
