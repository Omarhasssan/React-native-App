import React from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text, View } from 'react-native';
import Screens from './screens';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const App = ({ dispatch, nav }) => (
  <Screens
    navigation={addNavigationHelpers({
      dispatch,
      state: nav,
    })}
  />
);

const mapStateToProps = ({ nav }) => ({
  nav,
});

const AppWithNavigation = connect(mapStateToProps)(App);
export default () => (
  <Provider store={configureStore()}>
    <AppWithNavigation />
  </Provider>
);
