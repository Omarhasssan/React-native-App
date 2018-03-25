import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';

export default class Invitation extends Component {
  constructor(props) {
    super();
  }
  componentWillMount() {}
  render() {
    const { invitation, onAccept } = this.props;
    return (
      <View>
        <Text>{invitation.teamName}</Text>
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
