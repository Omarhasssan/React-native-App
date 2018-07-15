import React from 'react';
import { Text, View } from 'react-native';
import Random from '../containers/Random';
export default (RandomWithMsg = props =>
  (!props.team && (
    <Text
      style={{
        fontSize: 8,
        fontStyle: 'italic',
        color: 'white',
      }}
    >
      *WAIT FOR OPONNET TO JOIN YOUR ROOM*
    </Text>
  )) || <Random {...props} />);
