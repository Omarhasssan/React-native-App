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
import withCheckUserHaveTeam from '../hocs/withCheckUserHaveTeam';
import TeamTab from './TeamTab';
const mapDispatchToProps = dispatch => ({
  listenToUserChanges(userId) {
    dispatch(listenToUserChanges(userId));
  },
  listenToTeamChanges() {
    dispatch(listenToTeamChanges());
  },
  listenToRoomChanges(user) {
    dispatch(listenToRoomChanges(user));
  },
  listenToNotifications() {
    dispatch(listenToNotifications());
  },
});
class Profile extends Component {
  state = {
    activeTab:
      this.props.activeTab || (this.props.role == 'CAPTAIN' && 'CreateOrJoinRoom') || 'Team',
  };
  handleTabs() {
    const { user, observingMatches, notifications } = this.props;

    let defaultTabs = [
      {
        tabName: 'Team',
        tabNotifications: notifications.team.total == 0 ? null : notifications.team.total,
      },
      {
        tabName: 'Invitations',
        tabNotifications:
          notifications.invitations.total == 0 ? null : notifications.invitations.total,
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
      listenToRoomChanges,
      user,
      listenToUserChanges,
      listenToTeamChanges,
      listenToNotifications,
    } = this.props;
    listenToRoomChanges(user);
    listenToUserChanges(user.id);
    listenToTeamChanges();
    listenToNotifications();
  }
  componentWillReceiveProps(nextProps) {
    const { activeTab } = nextProps;
    if (activeTab != this.props.activeTab) this.setState({ activeTab: activeTab });
  }

  render() {
    const { activeTab } = this.state;
    const {
      navigation,
      team,
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
          {(activeTab == 'Team' && <TeamTab navigation={navigation} />) ||
            (activeTab == 'Invitations' && (
              <Invitations notifications={notifications.invitations} />
            )) ||
            (activeTab == 'Info' && <Text> {user.records.wins} </Text>) ||
            (activeTab == 'CreateOrJoinRoom' && <TabNavigator stackNavigation={navigation} />) ||
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
  model,
  observingMatches,
  notifications,
  notificationHandler,
}) => ({
  user: auth.user,
  showObserverModel: model.showObserver,
  showTeamDetailsModel: model.showTeamDetails,
  observingMatches,
  notifications,
  activeTab: notificationHandler.screenProps.activeTab,
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
