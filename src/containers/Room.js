import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet } from 'react-native';
import { leaveRoom, showModel, getRoom } from '../actions';
import Teams from '../components/Teams';
import Observer from '../components/Observer';
import SetDateTime from '../containers/SetDateTime';
var _ = require('lodash');
class Room extends Component {
  state = {
    date: '',
  };

  componentDidMount() {
    const { navigation, socket, user } = this.props;
    const { roomId } = navigation ? navigation.state.params : this.props;
    if (user.roomId != roomId) this.props.joinRoom(roomId);
    this.props.getRoom(roomId);
  }
  componentWillReceiveProps(nextProps) {
    const { room, navigation } = this.props;
    const { roomId } = navigation ? navigation.state.params : this.props;
    if (nextProps.room != this.props.room) this.props.getRoom(roomId);
  }

  componentWillUnmount() {
    const { navigation, user, socket, room } = this.props;
    // if not roomOwner he can leave
    if (user.roomId != room.id) {
      this.props.leaveRoom(room, socket);
    }
  }
  render() {
    const { date } = this.state;
    const { style, user, showObserverModel, room, setRoomDate } = this.props;
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
                _.has(room.settings, 'observer') && Object.keys(room.settings.observer).length > 0
                  ? room.settings.observer
                  : null
              }
              roomOwner={room.id === user.roomId}
            />
            <SetDateTime
              date={_.has(room.settings, 'date') && room.settings.date}
              setDate={date => setRoomDate(room, date, socket)}
            />
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
  room: roomsReducer.curntRoom,
});
const mapDispatchToProps = dispatch => ({
  leaveRoom(roomId, socket) {
    dispatch(leaveRoom(roomId, socket));
  },
  getRoom(roomId) {
    dispatch(getRoom(roomId));
  },
  showObserverModel() {
    dispatch(showModel());
  },
  setRoomDate(room, date, socket) {
    dispatch(setRoomDate(room, date, socket));
  },
  joinRoom(roomId) {
    dispatch({ type: 'CREATE_ROOM_BY_ROOM_ID', id: roomId });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Room);
