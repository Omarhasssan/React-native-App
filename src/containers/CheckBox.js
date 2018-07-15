import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import { CheckBox } from 'react-native-elements';

export default class MyCheckBox extends Component {
  state = {
    checked: false,
  };
  onCheck = () => {
    const { setCheck } = this.props;
    const { checked } = this.state;
    this.setState({ checked: !checked });
    setCheck(!checked);
  };
  render() {
    const { txt } = this.props;
    const { checked } = this.state;
    return (
      <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this.onCheck}>
        <Text style={{ fontSize: 10, color: 'white' }}>{txt}</Text>
        <CheckBox
          containerStyle={{
            padding: 0,
            margin: 0,
            borderWidth: 0,
            width: 0,
          }}
          size={15}
          checked={checked}
          onPress={this.onCheck}
        />
      </TouchableOpacity>
    );
  }
}
