import React from 'react';
import { TouchableOpacity, Text, Button, View, StyleSheet, TextInput } from 'react-native';

export default (Search = props => (
  <View style={styles.textinputContainer}>
    <TextInput onChangeText={props.onChangeText} style={styles.textinput} placeholder="search" />
  </View>
));
const styles = StyleSheet.create({
  textinput: {
    width: `${100}%`,
    height: 35,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  textinputContainer: {
    backgroundColor: '#cecece',
    padding: 10,
  },
});
