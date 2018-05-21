import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Player from '../components/Player';
import Counter from './Counter';

export default class ObservingTeam extends Component {
  state = {
    goals: 0,
  };
  render() {
    const { team, onScoringGoal } = this.props;
    const { players } = team;
    const { goals } = this.state;
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          // backgroundColor: 'yellow',
        }}
      >
        <View
          style={{
            width: `${80}%`,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <Text style={{ marginBottom: 10 }}>{team.name}</Text>
          <View style={{ width: 40, flexDirection: 'row' }}>
            <Text>{goals}</Text>
          </View>
        </View>
        {Object.keys(players).map(playerId => {
          let id = playerId;
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // backgroundColor: 'white',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}
              >
                <Text>{++id}-</Text>
                <View style={{ marginLeft: 5, marginRight: 5, flexShrink: 1 }}>
                  <Player containerStyle={{ flexDirection: 'row' }} player={players[playerId]} />
                </View>
              </View>

              <View style={{ width: 40, flexDirection: 'row' }}>
                <Counter
                  onIncrement={val => {
                    this.setState({ goals: goals + 1 });
                    onScoringGoal(players[playerId].id, val, this.state.goals + 1);
                  }}
                  onDecrement={val => {
                    this.setState({ goals: goals - 1 });
                    onScoringGoal(players[playerId].id, val, this.state.goals - 1);
                  }}
                />
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}
