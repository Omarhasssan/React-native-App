import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import { getUserRequest, acceptRequest } from '../actions';
import Invitation from '../components/Invitation';
import Btn from '../components/Btn';
import List from '../components/List';

class Invitations extends Component {
  state = {
    observingTab: false,
    joiningTeamsTab: false,
  };
  componentDidMount() {
    this.props.getUserInvitations(this.props.socket, this.props.user);
  }

  render() {
    const { user, userInvitations, onAccept, socket } = this.props;
    const { observingTab, joiningTeamsTab } = this.state;
    return (
      <View>
        <Btn
          renderAfterIcon={
            <Image
              style={{ width: 20, height: 20 }}
              source={
                (observingTab && require('../imges/uparrow.png')) ||
                require('../imges/downarrow.png')
              }
            />
          }
          txt="Observing"
          containerStyle={[{ marginTop: 5, marginBottom: 5 }, styles.tabContainer]}
          onPress={() => this.setState({ observingTab: !observingTab })}
        />
        {observingTab && (
          <List
            data={userInvitations}
            style={{ backgroundColor: '#ccd3e0', height: `${100}%` }}
            renderItem={({ item }) => (
              <Invitation
                type={'observingMatch'}
                onAccept={inv => onAccept(inv)}
                invitation={item.type == 'observingMatch' ? item : null}
              />
            )}
          />
        )}

        <Btn
          renderAfterIcon={
            <Image
              style={{ width: 20, height: 20 }}
              source={
                (joiningTeamsTab && require('../imges/uparrow.png')) ||
                require('../imges/downarrow.png')
              }
            />
          }
          txt="joiningTeams"
          containerStyle={styles.tabContainer}
          onPress={() => this.setState({ joiningTeamsTab: !joiningTeamsTab })}
        />
        {joiningTeamsTab && (
          <List
            data={userInvitations}
            style={{ backgroundColor: '#ccd3e0', height: `${100}%` }}
            renderItem={({ item }) => (
              <Invitation
                type={'joiningTeam'}
                onAccept={inv => onAccept(inv)}
                invitation={item.type == 'joinTeam' ? item : null}
              />
            )}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ auth, userInvitations, socket }) => ({
  user: auth.user,
  userInvitations,
  socket,
});

const mapDispatchToProps = dispatch => ({
  getUserInvitations(socket, user) {
    dispatch(getUserRequest(socket, user));
  },
  onAccept(inv) {
    dispatch(acceptRequest(inv));
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
