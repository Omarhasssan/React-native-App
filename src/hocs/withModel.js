import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default (withModel = (style, closeModel) => WrappedComponent =>
  class extends Component {
    render() {
      const { closeModel } = this.props;
      return (
        <View
          style={[
            style,
            {
              width: `${100}%`,
              height: `${100}%`,
              position: 'absolute',
              zIndex: 1,
              alignItems: 'center',
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => closeModel(this.props)}
            style={{
              backgroundColor: 'gray',
              width: `${100}%`,
              height: `${100}%`,
              zIndex: 1,
              opacity: 0.2,
            }}
          />
          <View style={styles.modelContainer}>
            <WrappedComponent {...this.props} />
          </View>
        </View>
      );
    }
  });
const styles = StyleSheet.create({
  modelContainer: {
    width: `${90}%`,
    height: `${50}%`,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,
    position: 'absolute',
    zIndex: 2,
  },
});
