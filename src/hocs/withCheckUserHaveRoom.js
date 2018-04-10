import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Room from '../containers/Room';

export default (withCheckUserHaveRoom = WrappedComponent =>
  class extends Component {
    static navigationOptions({ navigation }) {
      if (navigation.state.params && navigation.state.params.roomId) {
        return {
          tabBarLabel: 'Your Room',
        };
      }
    }

    componentWillMount() {
      this.props.navigation.setParams({
        roomId: this.props.user.roomId,
      });
    }
    componentWillReceiveProps(nextProps) {
      if (
        this.props.navigation.state.params &&
        nextProps.user.roomId != this.props.navigation.state.params.roomId
      ) {
        this.props.navigation.setParams({
          roomId: nextProps.user.roomId,
        });
      }
    }
    render() {
      const { user } = this.props;
      if (!user.roomId) return <WrappedComponent {...this.props} />;
      return <Room roomId={user.roomId} />;
    }
  });
