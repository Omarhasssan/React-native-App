import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';

export default class Invitation extends Component {
  constructor(props) {
    super();
  }

  render() {
    const { invitation, onAccept, type } = this.props;
    return (
      <View>
        {(type == 'observingMatch' && (
          <View>
            <Text>Date : {invitation.room.settings.date}</Text>
            <Text>Location : {invitation.room.settings.location}</Text>
            <Text>team1 : {invitation.room.teamOwner.name}</Text>
            <Text>team2 : {invitation.room.joinedTeam && invitation.room.joinedTeam.name}</Text>
          </View>
        )) || <Text>{invitation.teamName}</Text>}

        <TouchableOpacity onPress={() => onAccept(invitation)}>
          <Text>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Reject</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
