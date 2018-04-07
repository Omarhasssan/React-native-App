import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet } from 'react-native';
import { getUserRequest, acceptRequest } from '../actions';
import Invitation from '../components/Invitation';

class Invitations extends Component {
  componentDidMount() {
    this.props.getUserInvitations(this.props.socket, this.props.user);
  }

  render() {
    const { user, userInvitations, onAccept } = this.props;
    return (
      <View>
        {userInvitations.map(inv => (
          <Invitation onAccept={inv => onAccept(user, inv)} invitation={inv} />
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
