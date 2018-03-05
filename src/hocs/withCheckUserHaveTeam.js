import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Profile from '../containers/Profile';

export default (withCheckUserHaveTeam = WrappedComponent =>
  class extends Component {
    componentWillMount() {
      if (this.props.auth.user.teamId) this.props.navigation.navigate('Profile');
    }
    render() {
      const { user } = this.props.auth;
      if (!user.teamId) return <WrappedComponent {...this.props} />;
      return null;
    }
  });
