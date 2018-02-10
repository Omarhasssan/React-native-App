import { ActivityIndicator, View } from 'react-native';
import React from 'react';

export default (Spinner = () => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
));
