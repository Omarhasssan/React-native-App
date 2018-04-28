import React from 'react';
import { connect } from 'react-redux';
import { TabNavigator } from 'react-navigation'; // Version can be specified in package.json
import CreateRoom from './CreateRoom';
import Rooms from './Rooms';
import withCheckUserHaveRoom from '../hocs/withCheckUserHaveRoom';
import { joinRoom } from '../actions';

const Tabs = TabNavigator({
  createdRoom: { screen: withCheckUserHaveRoom(CreateRoom) },
  JoinRoom: { screen: Rooms },
});

const TabNav = props => <Tabs screenProps={props} />;

const mapStateToProps = ({ roomsReducer, auth, socket }) => ({
  rooms: roomsReducer.rooms,
  room: roomsReducer.createdRoom,
  user: auth.user,
  socket,
});
const mapDispatchToProps = dispatch => ({
  joinRoom(room, user, socket) {
    dispatch(joinRoom(room, user, socket));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TabNav);
