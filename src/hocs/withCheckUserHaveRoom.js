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
      const { user } = this.props.screenProps;
      this.props.navigation.setParams({
        roomId: user.roomId,
      });
    }
    componentWillReceiveProps(nextProps) {
      const { user } = nextProps.screenProps;

      if (
        this.props.navigation.state.params &&
        user.roomId != this.props.navigation.state.params.roomId
      ) {
        this.props.navigation.setParams({
          roomId: user.roomId,
        });
      }
    }
    render() {
      const { room } = this.props.screenProps;
      if (!room) return <WrappedComponent {...this.props} />;
      return <Room room={room} />;
    }
  });
