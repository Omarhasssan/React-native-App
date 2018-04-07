import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default (TxtInput = props => (
  <TextInput
    onChangeText={props.onChangeText}
    placeholder={props.placeholder}
    style={[styles.default, props.style]}
  />
));

const styles = StyleSheet.create({
  default: {
    width: `${100}%`,
    height: 35,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
});
