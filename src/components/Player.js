import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';

export default (Player = props => (
  <View>
    <Image
      style={styles.userImg}
      source={(props.player.imgUri && { uri: props.player.imgUri }) || require('../imges/user.png')}
    />
    <View style={{ width: `${100}%`, alignItems: 'center', padding: 5 }}>
      <Text style={{ fontSize: 8 }}>{props.player.name}</Text>
    </View>
  </View>
));

const styles = StyleSheet.create({
  userImg: {
    alignSelf: 'center',
    borderColor: '#D9D9D9',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
