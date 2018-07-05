import React, { Component } from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { Permissions, Notifications } from 'expo';

import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

<<<<<<< HEAD
const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);
=======
const middleware = createReactNavigationReduxMiddleware('root', state => state.nav);
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
const addListener = createReduxBoundAddListener('root');

export default (withHandleNotification = WrappedComponent =>
  class extends Component {
    componentDidMount() {
      Notifications.addListener(this.props.onNotificationClick);
    }
    componentWillReceiveProps = nextProps => {
      const { notificationHandler } = nextProps;
      const navigation = this.createNavigation();

<<<<<<< HEAD
      const activeScreen =
        navigation.state.routes[navigation.state.routes.length - 1].routeName;
=======
      const activeScreen = navigation.state.routes[navigation.state.routes.length - 1].routeName;
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d

      const { screen } = notificationHandler;

      if (
        screen &&
        notificationHandler != this.props.notificationHandler &&
<<<<<<< HEAD
=======
        Object.keys(nextProps.user).length &&
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
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
<<<<<<< HEAD
      return (
        <WrappedComponent
          navigation={this.createNavigation()}
          {...this.props}
        />
      );
=======
      return <WrappedComponent navigation={this.createNavigation()} {...this.props} />;
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
    }
  });
