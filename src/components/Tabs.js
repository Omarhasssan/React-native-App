import React, { Component } from 'react';

import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

export default class Tabs extends Component {
  state = {};
  render() {
    const { tabs, setActive, activeTab } = this.props;
    return (
      <View style={styles.tabContainer}>
        {tabs.map((tab, i) => (
          <TouchableOpacity
            style={
              tab == activeTab
                ? [styles.tab, styles.activeTab]
                : i == tabs.length - 1
                  ? [styles.tab, { borderRightWidth: 0 }]
                  : styles.tab
            }
            onPress={() => setActive(tab)}
          >
            <Text style={{ fontSize: 8 }}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    width: `${100}%`,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#1da1f2',
    borderRadius: 3,
    height: 30,
    //flex: 1,
  },
  activeTab: {
    backgroundColor: '#1da1f2',
    color: 'white',
  },
  tab: {
    backgroundColor: 'white',
    flex: 1,
    borderColor: '#1da1f2',
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: `${100}%`,
  },
});
