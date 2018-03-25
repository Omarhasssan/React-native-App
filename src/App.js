import React, { Component } from 'react';
// import io from 'socket.io-client/dist/socket.io';

import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import Screens from './screens';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

class App extends Component {
  render() {
    console.disableYellowBox = true;
    const { dispatch, nav } = this.props;
    return (
      <Screens
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
        })}
      />
    );
  }
}

const mapStateToProps = ({ nav }) => ({
  nav,
});

const mapDispatchToProps = dispatch => ({
  connect() {
    dispatch({ type: 'CONNECT' });
  },
  disconnect() {
    dispatch({ type: 'DISCONNECT' });
  },
  dispatch,
});

const AppWithNavigation = connect(mapStateToProps, mapDispatchToProps)(App);
export default () => (
  <Provider store={configureStore()}>
    <AppWithNavigation />
  </Provider>
);
