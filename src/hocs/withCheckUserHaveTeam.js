import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Team from '../containers/Team';

export default (withCheckUserHaveTeam = WrappedComponent =>
  class extends Component {
    render() {
      const { team } = this.props;
      if (!team.id) return <WrappedComponent {...this.props} />;
      return <Team team={team} screenProps={this.props.navigation} />;
    }
  });
