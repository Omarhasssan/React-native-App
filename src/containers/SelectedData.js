import React, { Component } from 'react';

import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import Item2 from '../components/Item2';

export default (SelectedData = (props) => {
  const { selectedData, checkedItems, onRemove } = props;
  return (
    <View style={{ flexDirection: 'row', padding: 15 }}>
      {selectedData.map(item => (
        <Item2
          onRemove={onRemove}
          itemIsChecked={checkedItems[item.id] || false}
          key={item.id}
          item={item}
        />
      ))}
    </View>
  );
});
