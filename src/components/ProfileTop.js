import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Tabs from './Tabs';

export default (ProfileTop = props => (
  <View style={{ width: `${100}%`, height: `${25}%` }}>
    <View style={styles.topContainer}>
      <Image
        style={styles.userImg}
        source={(props.user.imgUri && { uri: props.user.imgUri }) || require('../imges/user.png')}
      />
      <View style={{ width: `${100}%`, alignItems: 'center', padding: 5 }}>
        <Text>{props.user.name}</Text>
      </View>
    </View>
    <View style={styles.tabsContainer}>
      <Tabs
        setActive={tabName => props.setActive(tabName)}
        tabs={props.tabs}
        activeTab={props.activeTab}
      />
    </View>
  </View>
));
const styles = StyleSheet.create({
  tabsContainer: {
    position: 'absolute',
    bottom: 0,
    width: `${100}%`,
    alignItems: 'center',
  },
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
    height: 120,
    padding: 5,
  },
});
