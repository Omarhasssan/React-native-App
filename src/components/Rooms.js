import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import { joinRoom, getRooms } from '../actions';

class Rooms extends Component {
  componentDidMount() {
    this.props.getRooms();
  }

  render() {
    const {
      rooms, user, socket, onJoin, screenProps,
    } = this.props;
    return (
      <ScrollView contentContainerStyle={{ backgroundColor: 'white', height: `${100}%` }}>
        <FlatList
          data={rooms}
          keyExtractor={(item, index) => index}
          containerStyle={{ backgroundColor: 'red' }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                onJoin(user, item, socket);
                screenProps.navigate('Room', { roomId: item.id });
              }}
            >
              <Text>{item.Name}</Text>
              <Text>Team Name : {item.teamName}</Text>
              <Text>Locatin : {item.Location}</Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ auth, socket, roomsReducer }) => ({
  user: auth.user,
  socket,
  rooms: roomsReducer.rooms,
});
const mapDispatchToProps = dispatch => ({
  onJoin(user, room, socket) {
    dispatch(joinRoom(user, room, socket));
  },
  getRooms() {
    dispatch(getRooms());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
