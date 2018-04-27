import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Profile from '../containers/Profile';
import Team from '../containers/Team';

export default (withCheckUserHaveTeam = WrappedComponent =>
  class extends Component {
    render() {
      const { user } = this.props;
      if (!user.team) return <WrappedComponent {...this.props} />;
      return <Team teamId={user.team.id} screenProps={this.props.navigation} />;
    }
  });
