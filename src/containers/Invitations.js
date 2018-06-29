import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import {
  acceptRequest,
  removeObservingNotifications,
  removeJoiningTeamNotifications,
} from '../actions';
import Invitation from '../components/Invitation';
import Btn from '../components/Btn';
import List from '../components/List';

class Invitations extends Component {
  state = {
    observingTab: this.props.observingTab || false,
    joiningTeamsTab: false,
  };

  componentWillReceiveProps(nextProps) {
    const { observingTab } = nextProps;
    if (observingTab != this.props.observingTab) this.setState({ observingTab: observingTab });
  }
  render() {
    const {
      user,
      userInvitations,
      onAccept,
      notifications,
      removeObservingNotifications,
    } = this.props;
    const { observingTab, joiningTeamsTab } = this.state;
    return (
      <View>
        <Btn
          renderAfterIcon={
            <View style={{ flexDirection: 'row' }}>
              <Text>{notifications.observing}</Text>
              <Image
                style={{ width: 20, height: 20 }}
                source={
                  (observingTab && require('../imges/uparrow.png')) ||
                  require('../imges/downarrow.png')
                }
              />
            </View>
          }
          txt="Observing"
          containerStyle={[{ marginTop: 5, marginBottom: 5 }, styles.tabContainer]}
          onPress={() => {
            removeObservingNotifications();
            this.setState({ observingTab: !observingTab });
          }}
        />
        {observingTab && (
          <List
            data={userInvitations.observingRequests}
            style={{ backgroundColor: '#ccd3e0', height: `${100}%` }}
            renderItem={({ item }) => (
              <Invitation
                type={'observingMatch'}
                onAccept={inv => onAccept(inv)}
                invitation={item}
              />
            )}
          />
        )}

        <Btn
          renderAfterIcon={
            <View style={{ flexDirection: 'row' }}>
              <Text>{notifications.joiningTeam}</Text>
              <Image
                style={{ width: 20, height: 20 }}
                source={
                  (observingTab && require('../imges/uparrow.png')) ||
                  require('../imges/downarrow.png')
                }
              />
            </View>
          }
          txt="joiningTeams"
          containerStyle={styles.tabContainer}
          onPress={() => {
            removeObservingNotifications();
            this.setState({ joiningTeamsTab: !joiningTeamsTab });
          }}
        />
        {joiningTeamsTab && (
          <List
            data={userInvitations.teamRequests}
            style={{ backgroundColor: '#ccd3e0', height: `${100}%` }}
            renderItem={({ item }) => (
              <Invitation type={'joiningTeam'} onAccept={inv => onAccept(inv)} invitation={item} />
            )}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ auth, userInvitations, notificationHandler }) => ({
  user: auth.user,
  userInvitations,
  observingTab: notificationHandler.screenProps.observingTab,
});

const mapDispatchToProps = dispatch => ({
  onAccept(inv) {
    dispatch(acceptRequest(inv));
  },
  removeObservingNotifications() {
    dispatch(removeObservingNotifications());
  },
  removeJoiningTeamNotifications() {
    dispatch(removeJoiningTeamNotifications());
  },
});
const styles = StyleSheet.create({
  tabContainer: {
    padding: 10,
    backgroundColor: '#9cb0d1',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Invitations);
