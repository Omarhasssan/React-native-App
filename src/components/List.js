import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView, FlatList } from 'react-native';

export default (List = props => (
  <ScrollView contentContainerStyle={props.style}>
    <FlatList
      data={props.data}
      keyExtractor={(item, index) => index}
      renderItem={props.renderItem}
    />
  </ScrollView>
));
