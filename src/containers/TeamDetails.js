import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet } from 'react-native';

export const TeamDetails = (props) => {
  console.log('prp', props);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <View style={styles.txt}>
        <Text>{props.teamRecords && props.teamRecords.wins}</Text>
        <Text>Wins</Text>
      </View>
      <View style={styles.txt}>
        <Text>{props.teamRecords && props.teamRecords.loses}</Text>
        <Text>Loses</Text>
      </View>
      <View style={styles.txt}>
        <Text>{props.teamRecords && props.teamRecords.draws}</Text>
        <Text>Draws</Text>
      </View>
      <View style={styles.txt}>
        <Text>{props.teamRecords && props.teamRecords.gamesPlayed}</Text>
        <Text>GamesPlayed</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  txt: {
    alignItems: 'center',
  },
});
const mapStateToProps = ({ teamRecords }) => ({
  teamRecords,
});

export default connect(mapStateToProps, null)(TeamDetails);
