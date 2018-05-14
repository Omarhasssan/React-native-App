import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';

import withCheckUserHaveTeam from '../hocs/withCheckUserHaveTeam';
import { createTeamWithSendingRequests, getTeams } from '../actions';
import Btn from '../components/Btn';

class CreateOrJoinTeam extends Component {
  componentWillReceiveProps(nextProps) {
    // if team_players and team_name then disptch save team
    const {
      createTeamWithSendingRequests,
      teamPlayers,
      teamName,
      socket,
      user,
      navigation,
      team,
    } = nextProps;
    if (this.props.teamName !== nextProps.teamName) {
      if (teamPlayers && teamName) {
        createTeamWithSendingRequests(user, teamName, teamPlayers, socket);
        navigation.navigate('Profile');
      }
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
        <View
          style={{
            flexDirection: 'row',
            width: `${70}%`,
            justifyContent: 'space-between',
          }}
        >
          <Btn
            txt="Create Team"
            onPress={() => navigation.navigate('CreateTeamStepOne')}
            containerStyle={{ alignItems: 'center' }}
            txtStyle={{ color: 'gray', marginTop: 3 }}
            renderBeforeIcon={<Image source={require('../imges/create.png')} />}
          />
          <Btn
            txt="Join Team"
            onPress={() => navigation.navigate('JoinTeam')}
            containerStyle={{ alignItems: 'center' }}
            txtStyle={{ color: 'gray', marginTop: 3 }}
            renderBeforeIcon={<Image source={require('../imges/join.png')} />}
          />
        </View>
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  createTeamWithSendingRequests(user, teamName, teamPlayers, socket) {
    dispatch(createTeamWithSendingRequests(user, teamName, teamPlayers, socket));
  },
});
const mapStateToProps = ({
  auth, team, teamsReducer, socket,
}) => ({
  user: auth.user,
  teamPlayers: team.players,
  teamName: team.name,
  team: teamsReducer.curntTeam,
  socket,
});
export default connect(mapStateToProps, mapDispatchToProps)(withCheckUserHaveTeam(CreateOrJoinTeam));
