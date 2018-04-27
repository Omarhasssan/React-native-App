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
import { joinRoom } from '../actions';

const _ = require('lodash');

class Rooms extends Component {
  render() {
    const {
      rooms, user, socket, joinRoom, screenProps,
    } = this.props;
    return (
      <ScrollView contentContainerStyle={{ backgroundColor: 'white', height: `${100}%` }}>
        <FlatList
          data={rooms}
          keyExtractor={(item, index) => index}
          containerStyle={{ backgroundColor: 'red' }}
          renderItem={({ item }) =>
            item.id != user.roomId && (
              <TouchableOpacity
                onPress={() => {
                  joinRoom(item, user, socket);
                  screenProps.navigate('Room', { room: item });
                }}
              >
                <Text>{item.Name}</Text>
                <Text>Team Name : {item.teamOwner.name}</Text>
                <Text>Locatin : {item.settings && item.settings.location}</Text>
                <Text>
                  observer :
                  {_.has(item.settings, 'observer') && item.settings.observer.name}
                </Text>
                <Text>date : {item.settings && item.settings.date}</Text>
              </TouchableOpacity>
            )
          }
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
  joinRoom(room, user, socket) {
    dispatch(joinRoom(room, user, socket));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
