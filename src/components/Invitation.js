import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';

export default class Invitation extends Component {
  constructor(props) {
    super();
  }

  render() {
    const { invitation, onAccept, type } = this.props;
    return (
      <View style={styles.invitationContainer}>
        {(type == 'observingMatch' && (
          <View>
            <Text>Date : {invitation.room.settings.date}</Text>
            <Text>Location : {invitation.room.settings.location}</Text>
            <Text>team1 : {invitation.room.teamOwner.name}</Text>
            <Text>team2 : {invitation.room.joinedTeam && invitation.room.joinedTeam.name}</Text>
          </View>
        )) || <Text>{invitation.team && invitation.team.name}</Text>}

        <View style={styles.btnsContainer}>
          <Btn containerStyle={styles.Acbtn} txt="Accept" onPress={() => onAccept(invitation)} />
          <Btn containerStyle={styles.Rjbtn} txt="Reject" />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  invitationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  btnsContainer: {
    flexDirection: 'row',
    width: 130,
    justifyContent: 'space-between',
  },
  Acbtn: {
    padding: 5,
    backgroundColor: '#1da1f2',
  },
  Rjbtn: {
    padding: 5,
    backgroundColor: 'white',
  },
});
