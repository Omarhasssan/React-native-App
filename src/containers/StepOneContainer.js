import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import withCheckUserHaveTeam from '../hocs/withCheckUserHaveTeam';
import StepOneComp from '../components/StepOneComp';
import { addTeam } from '../actions';

class StepOneContainer extends Component {
  componentWillReceiveProps(nextProps) {
    // if team_players and team_name then disptch save team
    console.log('rc');
    const {
      onSaveTeam, teamPlayers, teamName, socket, user, navigation,
    } = nextProps;
    if (teamPlayers && teamName) {
      onSaveTeam(socket, user, teamName, teamPlayers);
      navigation.navigate('Profile');
    }
  }
  render() {
    const { navigation } = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StepOneComp
          onJoinTeam={() => navigation.navigate('JoinTeam')}
          onCreateTeam={() => navigation.navigate('CreateTeamStepOne')}
        />
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  onSaveTeam(socket, user, teamName, teamPlayers) {
    dispatch(addTeam(socket, user, teamName, teamPlayers));
  },
});
const mapStateToProps = ({ auth, team, socket }) => ({
  user: auth.user,
  teamPlayers: team.players,
  teamName: team.name,
  socket,
});
export default connect(mapStateToProps, mapDispatchToProps)(withCheckUserHaveTeam(StepOneContainer));
