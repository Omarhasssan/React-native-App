import React, { Component } from 'react';
import { List, ListItem, CheckBox } from 'react-native-elements';
import Item from '../components/Item';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';

export default (SearchResults = (props) => {
  const { data, onCheck, checkedItems } = props;
  return (
    <ScrollView contentContainerStyle={{ backgroundColor: 'white', height: `${100}%` }}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index}
        containerStyle={{ backgroundColor: 'red' }}
        renderItem={({ item }) => (
          <Item onCheck={onCheck} itemIsChecked={checkedItems[item.id] || false} item={item} />
        )}
      />
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    paddingLeft: 5,
    paddingRight: 5,
  },
});
