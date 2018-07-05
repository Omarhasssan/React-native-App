import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  getUserRequest,
  acceptRequest,
  removeObservingNotifications,
  removeJoiningTeamNotifications,
  reset,
} from '../actions';
import Invitation from '../components/Invitation';
import Btn from '../components/Btn';
import List from '../components/List';

class Invitations extends Component {
  state = {
    observingTab: false,
    joiningTeamsTab: false,
  };
  openJoiningTeamTab() {
    this.setState({ joiningTeamsTab: true });
    this.props.removeJoiningTeamNotifications();
    this.props.reset();
  }
  componentDidMount() {
    if (this.props.joiningTeamsTab) this.openJoiningTeamTab();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.joiningTeamsTab) this.openJoiningTeamTab();
  }
  componentWillUnMount() {
    this.setState({ joiningTeamsTab: false });
  }

  render() {
    const {
      user,
      userInvitations,
      onAccept,
      notifications,
      removeObservingNotifications,
      removeJoiningTeamNotifications,
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
          containerStyle={[
            { marginTop: 5, marginBottom: 5 },
            styles.tabContainer,
          ]}
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
                  (joiningTeamsTab && require('../imges/uparrow.png')) ||
                  require('../imges/downarrow.png')
                }
              />
            </View>
          }
          txt="joiningTeams"
          containerStyle={styles.tabContainer}
          onPress={() => {
            removeJoiningTeamNotifications();
            this.setState({ joiningTeamsTab: !joiningTeamsTab });
          }}
        />
        {joiningTeamsTab && (
          <List
            data={userInvitations.teamRequests}
            style={{ backgroundColor: '#ccd3e0', height: `${100}%` }}
            renderItem={({ item }) => (
              <Invitation
                type={'joiningTeam'}
                onAccept={inv => onAccept(inv)}
                invitation={item}
              />
            )}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({
  auth,
  userInvitations,
  notificationHandler,
  socket,
}) => ({
  user: auth.user,
  userInvitations,
  socket,
  joiningTeamsTab: notificationHandler.screenProps.joiningTeamsTab,
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
  reset() {
    dispatch(reset());
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
