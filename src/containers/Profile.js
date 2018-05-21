import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import {
  hideModel,
  listenToRoomChanges,
  onAcceptJoiningTeamRequest,
  getTeams,
  onTeamHasNewPlayer,
  onUserHasTeam,
  onUserHasMatchesToObserve,
  listenToUserChanges,
} from '../actions';
import Tabs from '../components/Tabs';
import Top from '../components/ProfileTop';
import TabNavigator from './TabNavigator';
import Invitations from './Invitations';
import CreateOrJoinTeam from './CreateOrJoinTeam';
import AddObserver from './AddObserver';
import withModel from '../hocs/withModel';
import MatchesToObserve from './MatchesToObserve';
const modelWithStyle = withModel(
  { justifyContent: 'flex-start', width: `${90}%` },
  ({ closeModel }) => closeModel(),
);
const mapDispatchToProps = dispatch => ({
  closeModel() {
    dispatch(hideModel());
  },

  listenToUserChanges(userId) {
    dispatch(listenToUserChanges(userId));
  },
  onTeamHasNewPlayer() {
    dispatch(onTeamHasNewPlayer());
  },
  getTeams() {
    dispatch(getTeams());
  },
  listenToRoomChanges(user, socket) {
    dispatch(listenToRoomChanges(user, socket));
  },
});
const ObserverWithModel = connect(null, mapDispatchToProps)(modelWithStyle(AddObserver));
class Profile extends Component {
  state = {
    activeTab: 'Info',
  };
  componentWillMount() {
    console.log('profile will fff');
  }
  componentWillReceiveProps(nextProps) {
    console.log('profile rc');
  }
  componentDidMount() {
    const {
      socket,
      listenToRoomChanges,
      onUserHasTeam,
      onTeamHasNewPlayer,
      getTeams,
      onUserHasMatchesToObserve,
      user,
      listenToUserChanges,
    } = this.props;
    listenToRoomChanges(user, socket);
    listenToUserChanges(user.id);
    //onUserHasTeam(user.id);
    onTeamHasNewPlayer();
    //onUserHasMatchesToObserve(user.id);
  }

  render() {
    const { activeTab } = this.state;
    const { navigation, user, showObserverModel, observingMatches } = this.props;

    let defaultTabs = ['Team', 'Invitations', 'Info'];
    let captainTabs,
      observerTabs = [];
    if (user.role == 'CAPTAIN') captainTabs = ['CreateOrJoinRoom'];
    if (observingMatches.length) {
      observerTabs = ['MatchesToObserve'];
    }
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
          {(activeTab == 'Team' && <CreateOrJoinTeam navigation={navigation} />) ||
            (activeTab == 'Invitations' && <Invitations />) ||
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

const mapStateToProps = ({ auth, socket, showObserverModel, observingMatches }) => ({
  user: auth.user,
  socket,
  showObserverModel: showObserverModel,
  observingMatches,
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
