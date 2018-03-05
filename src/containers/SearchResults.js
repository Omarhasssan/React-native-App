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

class SearchResults extends Component {
  state = {
    checkedItems: [],
  };
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.data != nextProps.data ||
      !this.isEqual(nextProps.allCheckedItems, this.state.checkedItems)
    );
  }
  componentWillReceiveProps(nextProps) {
    if (!this.isEqual(nextProps.allCheckedItems, this.state.checkedItems))
      this.setState({ checkedItems: nextProps.allCheckedItems });
  }
  isEqual(arr1, arr2) {
    for (var k in arr1) {
      if (arr1[k] != arr2[k]) return false;
    }
    return true;
  }
  render() {
    const { data, onCheck, allCheckedItems } = this.props;
    const { checkedItems } = this.state;
    return (
      <ScrollView contentContainerStyle={{ backgroundColor: 'white', height: `${100}%` }}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index}
          containerStyle={{ backgroundColor: 'red' }}
          renderItem={({ item }) => (
            <Item
              onCheck={(key, value) => {
                this.temp = [];
                this.temp = this.state.checkedItems;
                this.temp[key] = value;
                this.setState({ checkedItems: this.temp }, () => onCheck(this.temp));
              }}
              itemIsChecked={allCheckedItems[item.id] || false}
              item={item}
            />
          )}
        />
      </ScrollView>
    );
  }
}
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
export default SearchResults;
