import React from 'react';

import {
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';

const _ = require('lodash');

export default (Rooms = props => {
  const { screenProps } = props;
  const { navigate } = screenProps.stackNavigation;
  const { rooms, user, socket, joinRoom, team } = screenProps;
  return (
    <ScrollView
      contentContainerStyle={{ backgroundColor: 'black', height: `${100}%` }}
    >
      <FlatList
        data={rooms}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              joinRoom(item, team, socket);
              navigate('Room', { room: item });
            }}
          >
            <Text style={styles.txtStyle}>{item.Name}</Text>
            <Text style={styles.txtStyle}>
              Team Name : {item.teamOwner.name}
            </Text>
            <Text style={styles.txtStyle}>
              Room Status : {(item.joinedTeam && 'FULL') || 'EMPTY'}
            </Text>
            <Text style={styles.txtStyle}>
              Locatin :
              {(item.settings &&
                item.settings.location &&
                item.settings.location.address) ||
                'NO LOCATION'}
            </Text>
            <Text style={styles.txtStyle}>
              observer :
              {(_.has(item.settings, 'observer') &&
                Object.keys(item.settings.observer).length &&
                item.settings.observer.info.name) ||
                'NO OBSERVER'}
            </Text>
            <Text style={styles.txtStyle}>
              date : {(item.settings && item.settings.date) || 'NO DATE'}
            </Text>
            <View
              style={{
                borderBottomColor: 'gray',
                borderWidth: 1,
                width: `${50}%`,
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
});
const styles = StyleSheet.create({
  txtStyle: {
    color: 'white',
  },
});
