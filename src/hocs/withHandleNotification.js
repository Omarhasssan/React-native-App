import React, { Component } from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { Permissions, Notifications } from 'expo';

import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);
const addListener = createReduxBoundAddListener('root');

export default (withHandleNotification = WrappedComponent =>
  class extends Component {
    componentDidMount() {
      Notifications.addListener(this.props.onNotificationClick);
    }
    componentWillReceiveProps = nextProps => {
      const { notificationHandler } = nextProps;
      const navigation = this.createNavigation();

      const activeScreen =
        navigation.state.routes[navigation.state.routes.length - 1].routeName;

      const { screen } = notificationHandler;

      if (
        screen &&
        notificationHandler != this.props.notificationHandler &&
        screen != activeScreen
      ) {
        navigation.navigate(screen);
      }
    };

    createNavigation() {
      const { nav, dispatch } = this.props;

      return addNavigationHelpers({
        dispatch,
        state: nav,
        addListener,
      });
    }

    render() {
      return (
        <WrappedComponent
          navigation={this.createNavigation()}
          {...this.props}
        />
      );
    }
  });
