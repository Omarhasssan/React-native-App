import React from 'react';
import { connect } from 'react-redux';
import { TabNavigator } from 'react-navigation'; // Version can be specified in package.json
import CreateRoom from './CreateRoom';
import Rooms from '../components/Rooms';
import withCheckUserHaveRoom from '../hocs/withCheckUserHaveRoom';

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default TabNavigator({
  CreateRoom: { screen: connect(mapStateToProps)(withCheckUserHaveRoom(CreateRoom)) },
  JoinRoom: { screen: Rooms },
});
