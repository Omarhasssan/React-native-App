import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { showTeamDetailsModel, setOwnerReady, setGuestReady } from '../actions';
import Random from './Random';
import RandomWithMsg from '../hocs/RandomWithMsg';
import TeamReady from '../components/TeamReady';

const RoomTeams = ({
  showTeamDetailsModel,
  setOwnerReady,
  setGuestReady,
  room,
  roomType,
  socket,
}) => (
  <View style={styles.container}>
    <View style={styles.teamsContainer}>
      <View style={styles.teamContainer}>
        <Random
          team={room.teamOwner}
          teamType={roomType == 'joinedRoom' ? 'opponentTeam' : 'ownerTeam'}
          showTeamDetails={() => {
            showTeamDetailsModel(room.teamOwner.records);
          }}
        />
        <TeamReady
          teamType={roomType == 'createdRoom' ? 'ownerTeam' : 'opponentTeam'}
          isReady={Object.keys(room).length && room.settings.OwnerReady}
          setReady={val => setOwnerReady(room, val, socket)}
        />
      </View>
      <View style={styles.teamContainer}>
        <RandomWithMsg
          team={room.joinedTeam}
          teamType={roomType == 'createdRoom' ? 'opponentTeam' : 'ownerTeam'}
          showTeamDetails={() => {
            showTeamDetailsModel(room.joinedTeam.records);
          }}
        />
        <TeamReady
          teamType={
            room.joinedTeam && roomType == 'joinedRoom'
              ? 'ownerTeam'
              : 'opponentTeam'
          }
          isReady={Object.keys(room).length && room.settings.GuestReady}
          setReady={val => setGuestReady(room, val, socket)}
        />
      </View>
    </View>
  </View>
);
const styles = StyleSheet.create({
  container: {
    width: `${100}%`,
    height: `${40}%`,
    backgroundColor: '#1a212c',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  teamContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  teamsContainer: {
    flexDirection: 'row',
    width: `${60}%`,
    alignItems: 'center',
  },
});
const mapDispatchToProps = dispatch => ({
  showTeamDetailsModel(teamRecords) {
    dispatch(showTeamDetailsModel(teamRecords));
  },
  setOwnerReady(room, val, socket) {
    dispatch(setOwnerReady(room, val, socket));
  },
  setGuestReady(room, val, socket) {
    dispatch(setGuestReady(room, val, socket));
  },
});
export default connect(null, mapDispatchToProps)(RoomTeams);
