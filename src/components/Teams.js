import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default (Teams = (props) => {
  const { roomOwner, joinedTeam } = props;
  return (
    <View style={styles.container}>
      <View style={styles.teamsContainer}>
        <View style={styles.team}>
          <Image style={styles.userImg} source={require('../imges/user.png')} />
          <Text>{roomOwner && roomOwner.name}</Text>
        </View>
        <View style={styles.team}>
          {joinedTeam &&
            joinedTeam.name && (
              <Image style={styles.userImg} source={require('../imges/user.png')} />
            )}
          <Text style={(joinedTeam && joinedTeam.name && styles.teamExist) || styles.noTeam}>
            {(joinedTeam && joinedTeam.name) || 'Wait until another user join your room'}
          </Text>
        </View>
      </View>
      <View style={styles.border} />
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'green',
  },
  teamsContainer: {
    flexDirection: 'row',
    // backgroundColor: 'green',
    // padding: 10,
    marginTop: 65,
  },
  userImg: {
    borderColor: '#D9D9D9',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  noTeam: {
    color: 'gray',
    fontStyle: 'italic',
  },
  teamExist: {
    color: 'black',
    fontStyle: 'normal',
  },
  team: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  border: {
    width: `${50}%`,
    alignSelf: 'center',
    borderColor: 'black',
    opacity: 0.1,
    borderBottomWidth: 1,
    marginTop: 15,
  },
});
