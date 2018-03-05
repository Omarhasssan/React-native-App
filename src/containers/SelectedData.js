import React, { Component } from 'react';

import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import Item2 from '../components/Item2';

class SelectedData extends Component {
  state = {
    noOfSelected: 0,
  };
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.selectedData.length != this.state.noOfSelected;
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.noOfSelected != nextProps.selectedData.length)
      this.setState({ noOfSelected: nextProps.selectedData.length });
  }

  render() {
    const { selectedData, onCheck } = this.props;
    const { noOfSelected } = this.state;
    return (
      <View style={{ flexDirection: 'row', padding: 15 }}>
        {selectedData.map(item => (
          <Item2
            onCheck={key => {
              this.setState({ noOfSelected: this.state.noOfSelected - 1 }, () => onCheck(key));
            }}
            key={item.id}
            item={item}
          />
        ))}
      </View>
    );
  }
}

export default SelectedData;
