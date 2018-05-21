import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import ObservingTeam from './ObservingTeam';
import Btn from '../components/Btn';
import MatchToObserve from './MatchToObserve';

export default class MatchesToObserve extends Component {
  componentWillMount() {}
  render() {
    const { observingMatches } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {observingMatches.map(match => <MatchToObserve match={match} />)}
        </View>
      </View>
    );
  }
}
