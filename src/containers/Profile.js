import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import {
  listenToRoomChanges,
  listenToUserChanges,
  listenToTeamChanges,
  listenToNotifications,
} from '../actions';
import Top from '../components/ProfileTop';
import TabNavigator from './TabNavigator';
import Invitations from './Invitations';
import CreateOrJoinTeam from './CreateOrJoinTeam';
import MatchesToObserve from './MatchesToObserve';
import ObserverWithModel from './ObserverWithModel';
const mapDispatchToProps = dispatch => ({
  listenToUserChanges(userId) {
    dispatch(listenToUserChanges(userId));
  },
  listenToTeamChanges(socket) {
    dispatch(listenToTeamChanges(socket));
  },
  listenToRoomChanges(user, socket) {
    dispatch(listenToRoomChanges(user, socket));
  },
  listenToNotifications(socket) {
    dispatch(listenToNotifications(socket));
  },
});
class Profile extends Component {
  state = {
    activeTab:
      this.props.activeTab ||
      (this.props.role == 'CAPTAIN' && 'CreateOrJoinRoom') ||
      'Team',
  };
  handleTabs() {
    const { user, observingMatches, notifications } = this.props;

    let defaultTabs = [
      {
        tabName: 'Team',
        tabNotifications:
          notifications.team.total == 0 ? null : notifications.team.total,
      },
      {
        tabName: 'Invitations',
        tabNotifications:
          notifications.invitations.total == 0
            ? null
            : notifications.invitations.total,
      },
      {
        tabName: 'Info',
      },
    ];
    let captainTabs = [];
    let observerTabs = [];
    if (user.role == 'CAPTAIN') captainTabs = [{ tabName: 'CreateOrJoinRoom' }];
    if (observingMatches.length) {
      observerTabs = [{ tabName: 'MatchesToObserve' }];
    }
    return { defaultTabs, captainTabs, observerTabs };
  }

  componentDidMount() {
    const {
      socket,
      listenToRoomChanges,
      user,
      listenToUserChanges,
      listenToTeamChanges,
      listenToNotifications,
    } = this.props;
    listenToRoomChanges(user, socket);
    listenToUserChanges(user.id);
    listenToTeamChanges(socket);
    listenToNotifications(socket);
  }
  componentWillReceiveProps(nextProps) {
    const { activeTab } = nextProps;
    if (activeTab.length && activeTab != this.props.activeTab)
      this.setState({ activeTab: activeTab });
    // if user hasn't team before , then he has , then we need to listen his new team
    if (!this.props.team.id && nextProps.team.id) {
      console.log('=> BOO I GOT SOMETHING TO LISTEN IN (UR NEW TEAMM ;)) ');
      if (!this.props.team.id) console.log('=> MY OLD TEAM IS NULL');
      console.log('=> MY NEW TEAM IS  ', nextProps.team.id);

      this.props.listenToTeamChanges(this.props.socket);
    }
  }
  render() {
    const { activeTab } = this.state;
    const {
      navigation,
      user,
      showObserverModel,
      observingMatches,
      notifications,
    } = this.props;
    const { defaultTabs, captainTabs, observerTabs } = this.handleTabs();

    return (
      <View style={styles.container}>
        {showObserverModel && <ObserverWithModel />}

        <Top
          setActive={tabName => {
            this.setState({ activeTab: tabName });
          }}
          activeTab={activeTab}
          user={user}
          tabs={[...captainTabs, ...defaultTabs, ...observerTabs]}
        />

        <View style={{ flex: 1 }}>
          {(activeTab == 'Team' && (
            <CreateOrJoinTeam navigation={navigation} />
          )) ||
            (activeTab == 'Invitations' && (
              <Invitations notifications={notifications.invitations} />
            )) ||
            (activeTab == 'Info' && <Text> {user.records.wins} </Text>) ||
            (activeTab == 'CreateOrJoinRoom' && (
              <TabNavigator stackNavigation={navigation} />
            )) ||
            (activeTab == 'MatchesToObserve' && (
              <MatchesToObserve observingMatches={observingMatches} />
            ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = ({
  auth,
  socket,
  model,
  observingMatches,
  notifications,
  notificationHandler,
  teamsReducer,
}) => ({
  user: auth.user,
  team: teamsReducer.curntTeam,
  socket,
  showObserverModel: model.showObserver,
  showTeamDetailsModel: model.showTeamDetails,
  observingMatches,
  notifications,
  activeTab: notificationHandler.screenProps.activeTab,
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
