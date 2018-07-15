import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TeamTab from '../containers/TeamTab';

export default (withCheckUserHaveTeam = WrappedComponent =>
  class extends Component {
    render() {
      const { team, notifications } = this.props;
      if (!team.id) return <WrappedComponent {...this.props} />;
      return (
        <TeamTab
          team={team}
          notifications={notifications}
          screenProps={this.props.navigation}
        />
      );
    }
  });
