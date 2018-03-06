import React from 'react';
import { Button, Text, Image, View, TouchableOpacity, Dimensions } from 'react-native';
import { ImagePicker } from 'expo';

export default class ImagePickerExample extends React.Component {
  state = {
    dm: Dimensions.get('window'),
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onShowModel}
        style={{
          backgroundColor: '#D9D9D9',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50,
          borderWidth: 1,
          borderColor: '#D9D9D9',
          width: 100,
          height: 100,
        }}
      >
        {this.props.imgUri ? (
          <Image
            source={{ uri: this.props.imgUri }}
            style={{
              borderRadius: 50,
              borderWidth: 1,
              borderColor: '#D9D9D9',
              width: 100,
              height: 100,
            }}
          />
        ) : (
          <Text>add photo</Text>
        )}
      </TouchableOpacity>
    );
  }
}
