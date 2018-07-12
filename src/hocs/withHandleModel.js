import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TeamDetailsWithModel from '../containers/TeamDetailsWithModel';
import ObserverWithModel from '../containers/ObserverWithModel';

export default (withHandleModel = WrappedComponent =>
  class extends Component {
    render() {
      const { model } = this.props;
      const { showTeamRecords, showObserver } = model;
      return (
        <View style={{ flex: 1 }}>
          {showTeamRecords.show && (
            <TeamDetailsWithModel teamRecords={showTeamRecords.teamRecords} />
          )}
          {showObserver && <ObserverWithModel />}
          <WrappedComponent {...this.props} />
        </View>
      );
    }
  });
