import React, { Component } from 'react';
import { View, Text } from 'react-native';
import CreateOrJoinTeam from '../containers/CreateOrJoinTeam';

export default (withCheckUserHaveTeam = WrappedComponent =>
  class extends Component {
    render() {
      const { team } = this.props;
      if (!team.id) {
        return <CreateOrJoinTeam team={team} navigation={this.props.navigation} />;
      }
      return <WrappedComponent {...this.props} />;
    }
  });
