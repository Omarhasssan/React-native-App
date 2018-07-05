import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  Button,
} from 'react-native';
import PlayerInfo from '../components/Info';
import openMap from 'react-native-open-maps';
import Btn from '../components/Btn';
import withCheckUserHaveTeam from '../hocs/withCheckUserHaveTeam';

class TeamTab extends Component {
  state = {
    teamInfoTab: false,
    teamPlayersTab: false,
    teamNextMatchesTab: true,
    joinTeamRequestsTab: false,
  };

  render() {
    const { user, team } = this.props;
    const {
      teamInfoTab,
      teamNextMatchesTab,
      teamPlayersTab,
      joinTeamRequestsTab,
    } = this.state;
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
          <ScrollView
            contentContainerStyle={{
              backgroundColor: 'white',
              height: `${100}%`,
            }}
          >
            <FlatList
              data={Object.keys(team.players)}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => (
                <PlayerInfo
                  name={team.players[item].name}
                  imgUri={team.players[item].imgUri}
                />
              )}
            />
          </ScrollView>
        )}
        <Btn
          renderAfterIcon={
            <Image
              style={{ width: 20, height: 20 }}
              source={
                (teamNextMatchesTab && require('../imges/uparrow.png')) ||
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
          onPress={() =>
            this.setState({ teamNextMatchesTab: !teamNextMatchesTab })
          }
        />
        {(teamNextMatchesTab &&
          team.matches.length &&
          team.matches.map(match => (
            <View>
              <Text>
                DATE: {match.date.year} : {match.date.month} : {match.date.day}{' '}
                :
                {match.date.time.hours} : {match.date.time.minutes}
              </Text>
              <Btn
                txtStyle={{ fontStyle: 'bold', fontSize: 6, color: 'white' }}
                containerStyle={{
                  padding: 3,
                  width: 'auto',
                  backgroundColor: '#1da1f2',
                  alignItems: 'center',
                }}
                onPress={() =>
                  openMap({
                    latitude: match.location.latitude,
                    longitude: match.location.longitude,
                  })
                }
                txt={'Click To Open Location in Maps'}
              />
              <Text>Opponent Team : {match.opponentTeam.name}</Text>
            </View>
          ))) ||
          null}
      </View>
    );
  }
}

const mapStateToProps = ({ teamsReducer }) => ({
  team: teamsReducer.curntTeam,
});

export default connect(mapStateToProps)(withCheckUserHaveTeam(TeamTab));
