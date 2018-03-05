import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default (TeamName = props => (
  <TextInput
    style={[styles.textinput, { borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }]}
    onChangeText={props.onChange}
    placeholder="Enter Team Name"
  />
));
const styles = StyleSheet.create({
  textinput: {
    width: `${100}%`,
    height: 35,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    marginTop: 10,
  },
});
