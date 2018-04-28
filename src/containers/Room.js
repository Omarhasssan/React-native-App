import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet } from 'react-native';
import { leaveRoom, showModel, getRoom, joinRoom, setJoinedRoom } from '../actions';
import Teams from '../components/Teams';
import Observer from '../components/Observer';
import SetDateTime from '../containers/SetDateTime';
var _ = require('lodash');
class Room extends Component {
  state = {
    date: '',
    type: '',
    room: {},
  };
  componentDidMount() {
    const { navigation, setJoinedRoom, user, listenToObserverRequestStatus } = this.props;
    const { room } = navigation ? navigation.state.params : this.props;
    // if roomID comes from props then its roomOwner , if navigation then joinedRoom
    if (this.props.room) {
      this.setState({ type: 'createdRoom' });
      this.setState({ room: room });
      //listenToObserverRequestStatus();
    }
    // comes from navigation
    else {
      this.setState({ type: 'joinedRoom' }, () => setJoinedRoom(room));
    }
  }
  componentWillReceiveProps(nextProps) {
    const { type } = this.state;
    const { roomsReducer, user, socket, joinRoom } = nextProps;
    if (type == 'createdRoom') {
      this.setState({ room: roomsReducer.createdRoom });
    } else if (type == 'joinedRoom') {
      this.setState({ room: roomsReducer.joinedRoom });
    }
  }
  componentWillUnmount() {
    const { user, leaveRoom, socket } = this.props;
    const { room } = this.state;
    leaveRoom(room, socket);
  }
  render() {
    const { date, room } = this.state;
    const { style, user, showObserverModel, setRoomDate } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Teams roomOwner={room.teamOwner} joinedTeam={room.joinedTeam} />
        <View
          style={{
            backgroundColor: '#edf1f7',
            flex: 1,
            alignItems: 'center',
          }}
        >
          <View style={styles.settingsContainer}>
            <Observer
              onAdd={() => showObserverModel()}
              observer={
                _.has(room, 'settings') &&
                _.has(room.settings, 'observer') &&
                Object.keys(room.settings.observer).length > 0
                  ? room.settings.observer
                  : null
              }
              roomOwner={room.id === user.roomId}
            />
            <SetDateTime
              date={_.has(room, 'settings') && _.has(room.settings, 'date')}
              setDate={date => setRoomDate(room, date, socket)}
            />
            {/* add change location */}
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  settingsContainer: {
    marginTop: 5,
    flexDirection: 'column',
    width: `${70}%`,
    alignItems: 'center',
    height: `${50}%`,
    justifyContent: 'space-around',
  },
});
const mapStateToProps = ({ auth, socket, roomsReducer }) => ({
  user: auth.user,
  socket,
  roomsReducer,
});
const mapDispatchToProps = dispatch => ({
  showObserverModel() {
    dispatch(showModel());
  },
  setRoomDate(room, date, socket) {
    dispatch(setRoomDate(room, date, socket));
  },
  setJoinedRoom(room) {
    dispatch(setJoinedRoom(room));
  },
  joinRoom(room, user, socket) {
    dispatch(joinRoom(room, user, socket));
  },
  leaveRoom(room, socket) {
    dispatch(leaveRoom(room, socket));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Room);
