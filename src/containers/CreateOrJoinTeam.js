import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';

import { createTeamWithSendingRequests } from '../actions';
import Btn from '../components/Btn';

class CreateOrJoinTeam extends Component {
  componentWillReceiveProps(nextProps) {
    // if team_players and team_name then disptch save team
    const {
      createTeamWithSendingRequests,
      teamPlayers,
      teamName,
      user,
      navigation,
      team,
    } = nextProps;
    if (this.props.teamName !== nextProps.teamName) {
      if (teamPlayers && teamName) {
        createTeamWithSendingRequests(user, teamName, teamPlayers);
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
            renderBeforeIcon={
              <Image style={{ width: 60, height: 60 }} source={require('../imges/create.png')} />
            }
          />
          <Btn
            txt="Join Team"
            onPress={() => navigation.navigate('JoinTeam')}
            containerStyle={{ alignItems: 'center' }}
            txtStyle={{ color: 'gray', marginTop: 3 }}
            renderBeforeIcon={
              <Image style={{ width: 60, height: 60 }} source={require('../imges/join.png')} />
            }
          />
        </View>
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  createTeamWithSendingRequests(user, teamName, teamPlayers) {
    dispatch(createTeamWithSendingRequests(user, teamName, teamPlayers));
  },
});
const mapStateToProps = ({ auth, team }) => ({
  user: auth.user,
  teamPlayers: team.players,
  teamName: team.name,
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateOrJoinTeam);
