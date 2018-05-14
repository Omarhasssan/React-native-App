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
    <ScrollView contentContainerStyle={{ backgroundColor: 'white', height: `${100}%` }}>
      <FlatList
        data={rooms}
        keyExtractor={(item, index) => index}
        containerStyle={{ backgroundColor: 'red' }}
        renderItem={({ item }) =>
          item.id != user.roomId && (
            <TouchableOpacity
              onPress={() => {
                joinRoom(item, team, socket);
                navigate('Room', { room: item });
              }}
            >
              <Text>{item.Name}</Text>
              <Text>Team Name : {item.teamOwner.name}</Text>
              <Text>Locatin : {item.settings && item.settings.location.address}</Text>
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
});
