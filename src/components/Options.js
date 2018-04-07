import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import withModel from '../hocs/withModel';

const Options = props => (
  <View>
    <View>
      {props.options.map((option, i) => (
        <TouchableOpacity
          key={i}
          style={
            i == props.options.length - 1
              ? [styles.lastBtn, styles.btn]
              : i == 0 ? [styles.firstBtn, styles.btn] : styles.btn
          }
          onPress={() => option.onClick()}
        >
          <Text style={styles.txt}>{option.option}</Text>
        </TouchableOpacity>
      ))}
    </View>

    <View style={[{ marginTop: 5 }]}>
      <TouchableOpacity
        style={[styles.btn, { borderWidth: 1, borderRadius: 5, borderColor: '#e8edf4' }]}
        onPress={() => props.onCancel()}
      >
        <Text style={[styles.txt]}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
);
const styles = StyleSheet.create({
  lastBtn: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  firstBtn: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  btn: {
    width: `${100}%`,
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#e8edf4',
    alignItems: 'center',
  },
});

export default withModel(Options);
