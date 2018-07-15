import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Btn from '../components/Btn';
import TeamInfo from '../components/Info';

export default (Random = ({ team, teamType, showTeamDetails }) => (
  <View
    style={{
      justifyContent: 'space-between',
    }}
  >
    <TeamInfo
      userImgStyle={{ width: 40, height: 40 }}
      name={team && team.name}
      txtStyle={{ color: 'white' }}
    />
    <Btn
      txtStyle={{ fontStyle: 'bold', fontSize: 6, color: 'white' }}
      containerStyle={{
        padding: 3,
        width: 'auto',
        backgroundColor: '#1da1f2',
        // position: 'absolute',
        alignSelf: 'center',
      }}
      txt={(teamType == 'opponentTeam' && 'Team Records') || 'Your Records'}
      onPress={showTeamDetails}
    />
  </View>
));
const styles = StyleSheet.create({
  userImg: {
    alignSelf: 'center',
    borderColor: '#D9D9D9',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 20,
  },
});
