import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import ObservingTeam from './ObservingTeam';
import Btn from '../components/Btn';
import { submitMatchObservation } from '../actions';

class MatcheToObserve extends Component {
  state = {
    matchDetails: {
      firstTeam: {
        id: this.props.match.firstTeam.id,
        goals: '',
        playersGoals: {},
      },
      secondTeam: {
        id: this.props.match.secondTeam.id,
        goals: '',
        playersGoals: {},
      },
    },
  };
  componentWillMount() {}
  render() {
    const { match, submitMatchObservation } = this.props;
    const { matchDetails } = this.state;
    return (
      <View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 10,
          }}
        >
          <ObservingTeam
            team={match.firstTeam}
            onScoringGoal={(playerId, value, teamGoals) => {
              this.setState({
                matchDetails: {
                  ...this.state.matchDetails,
                  firstTeam: {
                    goals: teamGoals,
                    playersGoals: {
                      ...this.state.matchDetails.firstTeam.playersGoals,
                      [this.state.matchDetails.firstTeam.playersGoals.length]: {
                        id: playerId,
                        goals: value,
                      },
                    },
                  },
                },
              });
            }}
          />
          <Text>vs</Text>
          <ObservingTeam
            team={match.secondTeam}
            onScoringGoal={(playerId, value, teamGoals) => {
              this.setState({
                matchDetails: {
                  ...this.state.matchDetails,
                  secondTeam: {
                    goals: teamGoals,
                    playersGoals: {
                      ...this.state.matchDetails.secondTeam.playersGoals,
                      [this.state.matchDetails.secondTeam.playersGoals
                        .length]: {
                        id: playerId,
                        goals: value,
                      },
                    },
                  },
                },
              });
            }}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Btn
            txt="Submit"
            onPress={() => submitMatchObservation(matchDetails)}
            containerStyle={{
              backgroundColor: '#1da1f2',
              position: 'absolute',
              padding: 5,
              borderRadius: 3,
            }}
          />
        </View>
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  submitMatchObservation(matchDetails) {
    dispatch(submitMatchObservation(matchDetails));
  },
});
export default connect(null, mapDispatchToProps)(MatcheToObserve);
