import React, { Component } from 'react';

export default (withCheckUserHaveTeam = WrappedComponent =>
  class extends Component {
    render() {
      const { user } = this.props.auth;
      if (!user.teamId) return <WrappedComponent {...this.props} />;
      return null;
    }
  });
