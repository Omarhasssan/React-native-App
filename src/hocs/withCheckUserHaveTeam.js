import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Profile from '../containers/Profile';
import TabNavigator from '../containers/TabNavigator';

export default (withCheckUserHaveTeam = WrappedComponent =>
  class extends Component {
    componentDidMount() {
      this.props.getRooms();
    }

    render() {
      const { user, roomsReducer } = this.props;
      if (!user.teamId) return <WrappedComponent {...this.props} />;
      if (user.roomId && roomsReducer.rooms.length) {
        return <TabNavigator screenProps={this.props.navigation} />;
      }
      if (!user.roomId) return <TabNavigator screenProps={this.props.navigation} />;
      return null;
    }
  });
