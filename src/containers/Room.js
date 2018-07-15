import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { leaveRoom } from '../actions';
import RoomTeams from './RoomTeams';
import RoomSettings from './RoomSettings';
import SetMatch from '../components/SetMatch';
var _ = require('lodash');
class Room extends Component {
  state = {
    date: '',
    roomType: '',
    room: {},
    teamRecords: {},
  };
  componentDidMount() {
    const { navigation } = this.props;
    const { room } = navigation ? navigation.state.params : this.props;
    // if roomID comes from props then its roomOwner , if navigation then joinedRoom

    if (this.props.room) {
      this.setState({ roomType: 'createdRoom' });
      this.setState({ room: room });
    }
    // comes from navigation
    else {
      this.setState({ roomType: 'joinedRoom' });
    }
  }
  componentWillReceiveProps(nextProps) {
    const { roomType } = this.state;
    const { roomsReducer, socket, joinRoom } = nextProps;

    if (roomType == 'createdRoom') {
      this.setState({ room: roomsReducer.createdRoom });
    } else if (roomType == 'joinedRoom') {
      this.setState({ room: roomsReducer.joinedRoom });
    }
  }
  componentWillUnmount() {
    const { leaveRoom, socket } = this.props;
    const { room, roomType } = this.state;
    if (roomType == 'joinedRoom') leaveRoom(room, socket);
  }
  isAllRight() {
    const { room } = this.state;
    const { OwnerReady, GuestReady, date, observer, location } =
      room.settings || {};
    const { joinedTeam } = room || {};

    return (
      OwnerReady &&
      GuestReady &&
      joinedTeam &&
      (observer &&
        Object.keys(observer).length &&
        observer.status == 'ACCEPTED') &&
      location &&
      date &&
      date.length
    );
  }
  render() {
    const { date, room, roomType, teamRecords } = this.state;
    const { socket, stackNavigation } = this.props;
    let navigate;
    if (roomType == 'createdRoom') {
      navigate = stackNavigation.navigate;
    }

    return (
      <View style={{ flex: 1 }}>
        <RoomTeams room={room} roomType={roomType} socket={socket} />
        <RoomSettings
          navigate={navigate}
          roomSettings={room && room.settings}
          roomType={roomType}
          socket={socket}
        />
        <SetMatch isAllRight={this.isAllRight()} />
      </View>
    );
  }
}

const mapStateToProps = ({ socket, roomsReducer, model }) => ({
  socket,
  roomsReducer,
  showTeamRecords: model.showTeamRecords,
});
const mapDispatchToProps = dispatch => ({
  leaveRoom(room, socket) {
    dispatch(leaveRoom(room, socket));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Room);
