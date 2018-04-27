import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { hideModel, listenToRoomChanges, onAcceptJoiningTeamRequest, getTeams } from '../actions';
import Tabs from '../components/Tabs';
import Top from '../components/ProfileTop';
import TabNavigator from './TabNavigator';
import Invitations from './Invitations';
import CreateOrJoinTeam from './CreateOrJoinTeam';
import AddObserver from './AddObserver';
import withModel from '../hocs/withModel';
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
  getTeams() {
    dispatch(getTeams());
  },
});
const ObserverWithModel = connect(null, mapDispatchToProps)(modelWithStyle(AddObserver));
class Profile extends Component {
  state = {
    activeTab: 'Team',
  };

  componentDidMount() {
    const { socket, listenToRoomChanges, getTeams, user } = this.props;
    listenToRoomChanges(user, socket);
  }
  render() {
    const { activeTab } = this.state;
    const { navigation, user, showObserverModel } = this.props;
    let defaultTabs = ['Team', 'Invitations', 'Info'];
    let captainTabs = [];
    if (user.role == 'CAPTAIN') captainTabs = ['CreateOrJoinRoom'];
    return (
      <View style={styles.container}>
        {showObserverModel && <ObserverWithModel />}
        <Top
          setActive={tabName => {
            this.setState({ activeTab: tabName });
          }}
          activeTab={activeTab}
          user={user}
          tabs={[...captainTabs, ...defaultTabs]}
        />

        <View style={{ flex: 1 }}>
          {(activeTab == 'Team' && <CreateOrJoinTeam navigation={navigation} />) ||
            (activeTab == 'Invitations' && <Invitations />) ||
            (activeTab == 'Info' && <Text>player goals , matches played </Text>) ||
            (activeTab == 'CreateOrJoinRoom' && <TabNavigator screenProps={navigation} />)}
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

const mapStateToProps = ({ auth, socket, showObserverModel }) => ({
  user: auth.user,
  socket,
  showObserverModel: showObserverModel,
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
