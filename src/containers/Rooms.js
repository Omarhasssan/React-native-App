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

export default (Rooms = (props) => {
  const { screenProps } = props;
  const { navigate } = screenProps.stackNavigation;
  const {
    rooms, user, socket, joinRoom, team,
  } = screenProps;
  return (
    <ScrollView contentContainerStyle={{ backgroundColor: 'black', height: `${100}%` }}>
      {/* <View
        style={{
          position: 'absolute',
          height: `${100}%`,
          borderLeftColor: 'red',
          padding: 10,
          borderLeftWidth: 1,
        }}
      /> */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          padding: 5,
          flex: 1,
        }}
      >
        {rooms.map(room => (
          <TouchableOpacity
            onPress={() => {
              joinRoom(item, team, socket);
              navigate('Room', { room: item });
            }}
            style={{
              borderColor: 'gray',
              borderWidth: 1,
              alignItems: 'center',
              padding: 5,
              width: `${45}%`,
              marginBottom: 10,
            }}
          >
            <Text style={styles.txtStyle}>{room.teamOwner.name}</Text>
            {/* <Text style={styles.txtStyle}>
                Locatin : {item.settings && item.settings.location.address}
              </Text> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Text style={styles.txtStyle}>
                observer :
                {_.has(room.settings, 'observer') && room.settings.observer.name}
              </Text>
              <Text style={styles.txtStyle}>date : {room.settings && room.settings.date}</Text>
              <Text style={styles.txtStyle}>date : {room.settings && room.settings.date}</Text>
              <Text style={styles.txtStyle}>date : {room.settings && room.settings.date}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
});
const styles = StyleSheet.create({
  txtStyle: {
    color: 'white',
  },
});
