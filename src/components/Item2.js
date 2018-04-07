import React, { Component } from 'react';

import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';

class Item2 extends Component {
  state = {
    checked: true,
  };
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.itemIsChecked != this.state.checked || this.state != nextState;
  }

  render() {
    const { item, onRemove } = this.props;
    const { checked } = this.state;
    if (!checked) return null;

    return (
      <View key={item.id} style={{ flexDirection: 'column', marginRight: 10 }}>
        <Image
          style={{
            width: 45,
            height: 45,
            alignSelf: 'center',
            marginRight: 7,
          }}
          source={require('../imges/user.png')}
        />
        <TouchableOpacity
          style={{
            width: 20,
            height: 20,
            position: 'absolute',
            right: 0,
          }}
          onPress={() => {
            this.setState({ checked: false }, () => onRemove(item.id));
          }}
        >
          <Image source={require('../imges/crossicon.png')} />
        </TouchableOpacity>
        <Text style={{ alignSelf: 'center' }}>{item.name}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  circle: {
    width: '10',
    height: '10',
    borderRadius: 5,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
});
export default Item2;
