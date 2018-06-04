import React from 'react';
import { View, Text } from 'react-native';

export default (TopShadow = props => (
  <View
    style={[
      {
        backgroundColor: 'gray',
        position: 'absolute',
        zIndex: 1,

        opacity: 0.4,
        width: `${100}%`,
        height: `${100}%`,
      },
    ]}
  />
));
