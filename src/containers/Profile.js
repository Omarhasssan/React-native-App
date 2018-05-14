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
} from '../actions';
import Tabs from '../components/Tabs';
import Top from '../components/ProfileTop';
import TabNavigator from './TabNavigator';
import Invitations from './Invitations';
import CreateOrJoinTeam from './CreateOrJoinTeam';
import AddObserver from './AddObserver';
import withModel from '../hocs/withModel';
// import MatchesToObserve from './MatchesToObserve';
const modelWithStyle = withModel(
  { justifyContent: 'flex-start', width: `${90}%` },
  ({ closeModel }) => closeModel(),
);
const mapDispatchToProps = dispatch => ({
  closeModel() {
    dispatch(hideModel());
  },
  listenToRoomChanges(user, socket) {
    dispatch(listenToRoomChanges(user, socket));
  },
  onTeamHasNewPlayer() {
    dispatch(onTeamHasNewPlayer());
  },
  onUserHasTeam(userId) {
    dispatch(onUserHasTeam(userId));
  },
  getTeams() {
    dispatch(getTeams());
  },
  onUserHasMatchesToObserve(userId) {
    dispatch(onUserHasMatchesToObserve(userId));
  },
});
const ObserverWithModel = connect(null, mapDispatchToProps)(modelWithStyle(AddObserver));
class Profile extends Component {
  state = {
    activeTab: 'CreateOrJoinRoom',
  };
  componentWillMount() {
    console.log('profile will fff');
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
    } = this.props;
    //listen to roomChanges in socket
    listenToRoomChanges(user, socket);
    //listen to teamPlayersChanges in DB
    onTeamHasNewPlayer();
    //listen to userChanges in DB
    onUserHasTeam(user.id);

    onUserHasMatchesToObserve(user.id);
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
            (activeTab == 'Info' && <Text>player goals , matches played </Text>) ||
            (activeTab == 'CreateOrJoinRoom' && <TabNavigator stackNavigation={navigation} />)}
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
