import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';

export default (Info = props => (
  <View style={props.containerStyle}>
    <Image
      style={[styles.userImg, props.userImgStyle]}
      source={
        (props.imgUri && { uri: props.imgUri }) || require('../imges/user.png')
      }
    />
    <View style={{ alignItems: 'center', padding: 5 }}>
      <Text style={[{ fontSize: 10 }, props.txtStyle]}>{props.name}</Text>
    </View>
  </View>
));

const styles = StyleSheet.create({
  userImg: {
    alignSelf: 'center',
    borderColor: '#D9D9D9',
    width: 25,
    height: 25,
    borderRadius: 10,
  },
});
