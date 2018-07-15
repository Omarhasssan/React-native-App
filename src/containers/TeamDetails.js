import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export default (TeamDetails = props => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#1a212c',
      }}
    >
      <View style={styles.txt}>
        <Text style={{ color: '#1da1f2' }}>
          {props.teamRecords && props.teamRecords.wins}
        </Text>
        <Text style={{ color: 'white' }}>Wins</Text>
      </View>
      <View style={styles.txt}>
        <Text style={{ color: '#1da1f2' }}>
          {props.teamRecords && props.teamRecords.loses}
        </Text>
        <Text style={{ color: 'white' }}>Loses</Text>
      </View>
      <View style={styles.txt}>
        <Text style={{ color: '#1da1f2' }}>
          {props.teamRecords && props.teamRecords.draws}
        </Text>
        <Text style={{ color: 'white' }}>Draws</Text>
      </View>
      <View style={styles.txt}>
        <Text style={{ color: '#1da1f2' }}>
          {props.teamRecords && props.teamRecords.gamesPlayed}
        </Text>
        <Text style={{ color: 'white' }}>GamesPlayed</Text>
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  txt: {
    alignItems: 'center',
  },
});
