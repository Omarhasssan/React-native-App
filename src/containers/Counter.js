import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Btn from '../components/Btn';
export default class Counter extends Component {
  state = { value: 0 };
  render() {
    const { value } = this.state;
    const { onDecrement, onIncrement } = this.props;
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Btn
          conta
          txt={'-'}
          onPress={() => {
            this.setState({ value: value - 1 });
            onDecrement(this.state.value - 1);
          }}
        >
          -
        </Btn>
        <Text>{value}</Text>
        <Btn
          txt={'+'}
          onPress={() => {
            this.setState({ value: value + 1 });
            onIncrement(this.state.value + 1);
          }}
        >
          -
        </Btn>
      </View>
    );
  }
}
