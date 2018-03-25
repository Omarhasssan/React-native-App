import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet } from 'react-native';
import { getUserRequest, acceptRequest } from '../actions';
import Tabs from '../components/Tabs';
import Top from '../components/ProfileTop';
import Invitations from './Invitations';
class Profile extends Component {
  state = {
    activeTab: 'Home',
  };

  render() {
    const { activeTab } = this.state;
    return (
      <View style={styles.container}>
        <Top
          setActive={tabName => {
            this.setState({ activeTab: tabName });
          }}
          activeTab={activeTab}
        />
        <View>
          {(activeTab == 'Home' && <Text>Home</Text>) ||
            (activeTab == 'Invitations' && <Invitations />) ||
            (activeTab == 'Info' && <Text>Info</Text>)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Profile;
