import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Tabs from './Tabs';

export default (ProfileTop = props => (
  <View
    style={{
      // backgroundColor: 'green',
      height: `${27}%`,
      justifyContent: 'space-between',
    }}
  >
    <View style={styles.topContainer}>
      <Image
        style={styles.userImg}
        source={
          (props.user.imgUri && { uri: props.user.imgUri }) ||
          require('../imges/user.png')
        }
      />
      <View style={{ width: `${100}%`, alignItems: 'center', padding: 5 }}>
        <Text>{props.user.name}</Text>
      </View>
    </View>
    <Tabs
      setActive={tabName => props.setActive(tabName)}
      tabs={props.tabs}
      activeTab={props.activeTab}
    />
  </View>
));
const styles = StyleSheet.create({
  userImg: {
    alignSelf: 'center',
    marginRight: 7,
    borderColor: '#D9D9D9',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  topContainer: {
    width: `${100}%`,
    height: `${60}%`,
    //backgroundColor: 'yellow',
    padding: 5,
  },
});
