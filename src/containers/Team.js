import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import { getTeam } from '../actions';
import Player from '../components/Player';

class Team extends Component {
  state = {
    teamInfoTab: false,
    teamPlayersTab: false,
    teamNextMatchesTab: false,
    joinTeamRequestsTab: false,
  };

  componentDidMount() {
    const { teamId, getTeam } = this.props;
    getTeam(teamId);
  }

  componentWillUnmount() {
    console.log('team unmounted');
  }

  render() {
    const { user, team } = this.props;
    const { teamInfoTab, teamNextMatchesTab, teamPlayersTab, joinTeamRequestsTab } = this.state;
    return (
      <View>
        <Btn
          renderAfterIcon={
            <Image
              style={{ width: 20, height: 20 }}
              source={
                (teamInfoTab && require('../imges/uparrow.png')) ||
                require('../imges/downarrow.png')
              }
            />
          }
          txt="Team Info"
          containerStyle={{
            padding: 10,
            backgroundColor: '#edf1f7',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => this.setState({ teamInfoTab: !teamInfoTab })}
        />
        {teamInfoTab && <Text>team wins and losses and matches</Text>}
        <Btn
          renderAfterIcon={
            <Image
              style={{ width: 20, height: 20 }}
              source={
                (teamInfoTab && require('../imges/uparrow.png')) ||
                require('../imges/downarrow.png')
              }
            />
          }
          txt="Team Players"
          containerStyle={{
            padding: 10,
            backgroundColor: '#edf1f7',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => this.setState({ teamPlayersTab: !teamPlayersTab })}
        />
        {teamPlayersTab && (
          <ScrollView contentContainerStyle={{ backgroundColor: 'white', height: `${100}%` }}>
            <FlatList
              data={team.players}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => <Player player={item} />}
            />
          </ScrollView>
        )}
        <Btn
          renderAfterIcon={
            <Image
              style={{ width: 20, height: 20 }}
              source={
                (teamInfoTab && require('../imges/uparrow.png')) ||
                require('../imges/downarrow.png')
              }
            />
          }
          txt="Team NextMatches"
          containerStyle={{
            padding: 10,
            backgroundColor: '#edf1f7',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => this.setState({ teamNextMatchesTab: !teamNextMatchesTab })}
        />
        {teamNextMatchesTab && <Text>TEAM NEXT MATCHES</Text>}
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getTeam(teamId) {
    dispatch(getTeam(teamId));
  },
});
const mapStateToProps = ({ auth, socket, teamsReducer }) => ({
  user: auth.user,
  socket,
  team: teamsReducer.curntTeam,
});
export default connect(mapStateToProps, mapDispatchToProps)(Team);
