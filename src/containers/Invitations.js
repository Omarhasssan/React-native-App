import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet } from 'react-native';
import { getUserRequest, acceptRequest } from '../actions';
import Invitation from '../components/Invitation';
import Btn from '../components/Btn';

class Invitations extends Component {
  componentDidMount() {
    this.props.getUserInvitations(this.props.socket, this.props.user);
  }

  state = {
    observingTab: false,
    joiningTeamsTab: false,
  };
  render() {
    const { user, userInvitations, onAccept } = this.props;
    const { observingTab, joiningTeamsTab } = this.state;
    return (
      <View>
        <Btn
          renderRightIcon={
            <Image
              style={{ width: 20, height: 20 }}
              source={
                (observingTab && require('../imges/uparrow.png')) ||
                require('../imges/downarrow.png')
              }
            />
          }
          txt="Observing"
          containerStyle={{
            padding: 10,
            backgroundColor: '#edf1f7',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => this.setState({ observingTab: !observingTab })}
        />
        {observingTab &&
          userInvitations.map(inv => (
            <Invitation
              type={'observingMatch'}
              onAccept={inv => onAccept(user, inv)}
              invitation={inv.type == 'observing' ? inv : null}
            />
          ))}

        <Btn
          renderRightIcon={
            <Image
              style={{ width: 20, height: 20 }}
              source={
                (joiningTeamsTab && require('../imges/uparrow.png')) ||
                require('../imges/downarrow.png')
              }
            />
          }
          txt="joiningTeams"
          containerStyle={{
            padding: 10,
            backgroundColor: '#edf1f7',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => this.setState({ joiningTeamsTab: !joiningTeamsTab })}
        />
        {joiningTeamsTab &&
          userInvitations.map(inv => (
            <Invitation
              type={'joiningTeam'}
              onAccept={inv => onAccept(user, inv)}
              invitation={inv.type == 'joiningTeam' ? inv : null}
            />
          ))}
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
  onAccept(user, inv) {
    dispatch(acceptRequest(user, inv));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Invitations);
