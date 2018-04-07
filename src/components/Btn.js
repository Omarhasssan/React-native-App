import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default (Btn = props => (
  <TouchableOpacity
    style={{
      padding: 3,
      width: props.width,
      height: props.height,
      backgroundColor: props.backgroundColor,
    }}
    onPress={props.onPress}
  >
    <Text
      style={{
        color: props.color,
        fontStyle: props.fontStyle,
        fontSize: props.txtSize,
      }}
    >
      {props.txt}
    </Text>
  </TouchableOpacity>
));
