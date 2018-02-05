import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screens from './screens'
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
export default class App extends React.Component {

  render() {
    
    return (
      <Provider store={configureStore()}>
      <Screens />
      </Provider>
    );
  }
}


