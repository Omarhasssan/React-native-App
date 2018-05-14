import React from 'react';
import { View, Text } from 'react-native';

export default (Tst = () => (
  <View style={{ flex: 1, backgroundColor: 'cornflowerblue' }}>
    <View
      style={{
        flex: 1,
        backgroundColor: 'green',
      }}
    >
      <Text>tstt st</Text>
    </View>
    <View style={{ flex: 1, flexGrow: 1, backgroundColor: 'blue' }}>
      <Text>tstt st</Text>
    </View>
  </View>
));
