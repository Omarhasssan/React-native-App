import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TabNavigator } from 'react-navigation'; // Version can be specified in package.json
import CreateRoom from './CreateRoom';
import Rooms from './Rooms';
import withCheckUserHaveRoom from '../hocs/withCheckUserHaveRoom';
import { joinRoom, setJoinedRoom, listenToRoomChanges } from '../actions';

const Tabs = TabNavigator({
  createdRoom: { screen: withCheckUserHaveRoom(CreateRoom) },

  JoinRoom: { screen: Rooms },
});

class TabNav extends Component {
  componentDidMount() {}

  render() {
    return <Tabs screenProps={this.props} />;
  }
}

const mapStateToProps = ({ roomsReducer, auth, teamsReducer }) => ({
  rooms: roomsReducer.rooms,
  room: roomsReducer.createdRoom,
  user: auth.user,
  team: teamsReducer.curntTeam,
  teamsReducer,
});
const mapDispatchToProps = dispatch => ({
  joinRoom(room, user) {
    dispatch(setJoinedRoom(room));
    dispatch(joinRoom(room, user));
  },
  listenToRoomChanges(user) {
    dispatch(listenToRoomChanges(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TabNav);
