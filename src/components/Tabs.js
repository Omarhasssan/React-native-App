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
              tab.tabName == activeTab
                ? [styles.tab, styles.activeTab]
                : i == tabs.length - 1
                  ? [styles.tab, { borderRightWidth: 0 }]
                  : styles.tab
            }
            onPress={() => setActive(tab.tabName)}
          >
            <Text style={{ fontSize: 8 }}>{tab.tabName}</Text>
            {tab.tabNotifications && (
              <View style={styles.notificationCnt}>
                <Text style={{ fontSize: 8, color: 'white' }}>
                  {tab.tabNotifications && tab.tabNotifications}
                </Text>
              </View>
            )}
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
  notificationCnt: {
    backgroundColor: 'red',
    borderRadius: 7,
    position: 'absolute',
    width: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    top: -5,
    right: 0,
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
