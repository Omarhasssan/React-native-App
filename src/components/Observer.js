import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import withSearchContainer from '../hocs/withSearchContainer';
import { getPlayers } from '../actions';
import Player from './Player';
import Btn from './Btn';

export default (Observer = props => (
  <View style={[styles.container]}>
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}
    >
      {(props.observer && <Player player={props.observer} />) ||
        (!props.roomOwner && (
          <View style={{ backgroundColor: 'white', width: 50 }}>
            <Text style={{ fontSize: 6, fontWeight: 'bold' }}>
              *No Observer added for this room*
            </Text>
          </View>
        ))}
      {props.roomOwner && (
        <View>
          <Btn
            txtStyle={{ fontStyle: 'bold', fontSize: 6, color: 'white' }}
            containerStyle={{
 padding: 3, width: 'auto', height: 13, backgroundColor: '#1da1f2',
}}
            txt={`${(props.observer && 'Change Observer') || 'Add Observer'}`}
            onPress={props.onAdd}
          />
        </View>
      )}
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ fontStyle: 'italic', fontSize: 6 }}>
        {(props.observer && props.roomOwner && 'A Request will sent to him') ||
          (props.roomOwner &&
            '*You should add an observer to record match details such as who scores goals and which team won*') ||
          (!props.roomOwner &&
            'this observer will record match details such as who scores goals and which team won')}
      </Text>
    </View>
  </View>
));
const styles = StyleSheet.create({
  userImg: {
    alignSelf: 'center',
    borderColor: '#D9D9D9',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
