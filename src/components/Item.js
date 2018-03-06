import React, { Component } from 'react';
import { List, ListItem, CheckBox } from 'react-native-elements';

import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';

class Item extends Component {
  state = {
    checked: false,
  };
  shouldComponentUpdate(nextProps, nextState) {
    return this.state != nextState || this.props.item != nextProps.item;
  }
  componentWillMount() {
    this.setState({ checked: false });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.itemIsChecked != this.state.checked)
      this.setState({ checked: nextProps.itemIsChecked });
  }

  render() {
    const { item, onCheck } = this.props;
    const { checked } = this.state;
    if (item.name == 'aa') console.log('img', item.imgUri);

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ checked: !checked });
          onCheck(item.id, !checked);
        }}
        key={item.id}
        style={styles.itemContainer}
      >
        <Image
          style={{
            alignSelf: 'center',
            marginRight: 7,
            borderColor: '#D9D9D9',
            width: 40,
            height: 40,
            borderRadius: 20,
            borderWidth: 1,
          }}
          source={(item.imgUri && { uri: item.imgUri }) || require('../imges/user.png')}
        />
        <Text style={{ flex: 1, alignSelf: 'center' }}>{item.name}</Text>
        <CheckBox
          checked={checked}
          containerStyle={{
            backgroundColor: 'transparent',
            width: 0,
            borderWidth: 0,
          }}
        />
      </TouchableOpacity>
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
export default Item;
