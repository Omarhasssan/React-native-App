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
  TouchableOpacity,
} from 'react-native';
import PlayerInfo from '../components/Info';
import openMap from 'react-native-open-maps';
import Btn from '../components/Btn';
import NextMatch from './NextMatch';
import { removeNextMatchesNotifications } from '../actions';

class TeamTab extends Component {
  state = {
    teamInfoTab: false,
    teamPlayersTab: false,
    teamNextMatchesTab: false,
    joinTeamRequestsTab: false,
  };

  render() {
    const { notifications, team, removeNextMatchesNotifications } = this.props;
    const { teamInfoTab, teamNextMatchesTab, teamPlayersTab } = this.state;
    return (
      <View style={{ flex: 1 }}>
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
            <View style={{ flexDirection: 'row' }}>
              <Text>
                {notifications.nextMatches != 0 && notifications.nextMatches}
              </Text>
              <Image
                style={{ width: 20, height: 20 }}
                source={
                  (teamNextMatchesTab && require('../imges/uparrow.png')) ||
                  require('../imges/downarrow.png')
                }
              />
            </View>
          }
          txt="Team NextMatches"
          containerStyle={{
            padding: 10,
            backgroundColor: '#edf1f7',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => {
            this.setState({ teamNextMatchesTab: !teamNextMatchesTab });
            if (notifications.nextMatches != 0)
              removeNextMatchesNotifications();
          }}
        />
        <View style={{ flex: 1 }}>
          {teamNextMatchesTab &&
            team.matches &&
            team.matches.map(match => <NextMatch nextMatch={match} />)}
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  removeNextMatchesNotifications() {
    dispatch(removeNextMatchesNotifications());
  },
});

export default connect(null, mapDispatchToProps)(TeamTab);
