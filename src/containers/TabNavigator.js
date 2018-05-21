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
  componentDidMount() {
    const { listenToRoomChanges, user, socket } = this.props;
    // listenToRoomChanges(user, socket);
  }

  render() {
    return <Tabs screenProps={this.props} />;
  }
}

const mapStateToProps = ({
  roomsReducer, auth, socket, teamsReducer,
}) => ({
  rooms: roomsReducer.rooms,
  room: roomsReducer.createdRoom,
  user: auth.user,
  team: teamsReducer.curntTeam,
  socket,
  teamsReducer,
});
const mapDispatchToProps = dispatch => ({
  joinRoom(room, user, socket) {
    dispatch(setJoinedRoom(room));
    dispatch(joinRoom(room, user, socket));
  },
  listenToRoomChanges(user, socket) {
    dispatch(listenToRoomChanges(user, socket));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TabNav);
