import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default (withModel = (style, closeModel) => WrappedComponent =>
  class extends Component {
    render() {
      const { closeModel } = this.props;
      const { justifyContent, width, height } = style;
      console.log('closeModel', closeModel, 'style', style);
      return (
        <View
          style={{
            width: `${100}%`,
            height: `${100}%`,
            position: 'absolute',
            zIndex: 1,
            alignItems: 'center',
            justifyContent,
          }}
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
          <View style={[styles.modelContainer, { width, height }]}>
            <WrappedComponent {...this.props} />
          </View>
        </View>
      );
    }
  });
const styles = StyleSheet.create({
  modelContainer: {
    width: `${90}%`,
    height: 'auto',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,
    position: 'absolute',
    zIndex: 2,
  },
});

// settings of model
// model needs flex start or end or center and width and height
