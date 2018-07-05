import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { userService } from '../Service';

export default class Tst extends Component {
  componentWillMount() {
    userService.saveUser();
  }
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          backgroundColor: 'green',
        }}
      >
        <View style={{ flexDirection: 'column-reverse' }}>
          <Text style={{ fontSize: 10 }}>asd</Text> <Text style={{ fontSize: 10 }}>asd</Text>
        </View>
        <View>
          <Text style={{ fontSize: 10 }}>asd</Text>
        </View>
      </View>
    );
  }
}
