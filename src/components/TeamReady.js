import React from 'react';
import { Text, View } from 'react-native';
import Ready from '../containers/CheckBox';
export default (TeamReady = ({ teamType, isReady, setReady }) => (
  <View style={{ height: 30, justifyContent: 'center' }}>
    {(teamType == 'ownerTeam' && <Ready txt={'Ready'} setCheck={setReady} />) ||
      (isReady && (
        <Text style={{ color: 'white', fontSize: 15 }}>Ready</Text>
      )) ||
      null}
  </View>
));
