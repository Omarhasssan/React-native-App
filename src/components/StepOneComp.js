import React from 'react';
import { TouchableOpacity, Text, Button, View, StyleSheet, TextInput } from 'react-native';

export default (StepOneComp = props => (
  <View>
    <TouchableOpacity onPress={() => props.onCreateTeam()}>
      <Text style={{ color: 'gray' }}>Create Team</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => props.onJoinTeam()}>
      <Text style={{ color: 'gray' }}>Join Team</Text>
    </TouchableOpacity>
  </View>
));
