import React from 'react';
import { TouchableOpacity, Image, Text, Button, View, StyleSheet, TextInput } from 'react-native';

export default (StepOneComp = props => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: `${70}%`,
    }}
  >
    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => props.onCreateTeam()}>
      <Image source={require('../imges/create.png')} />
      <Text style={{ color: 'gray', marginTop: 3 }}>Create Team</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => props.onJoinTeam()}>
      <Image source={require('../imges/join.png')} />
      <Text style={{ color: 'gray', marginTop: 3 }}>Join Team</Text>
    </TouchableOpacity>
  </View>
));
