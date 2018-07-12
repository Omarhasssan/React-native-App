import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import withSearchContainer from '../hocs/withSearchContainer';
import { getPlayers } from '../actions';
import PlayerInfo from '../components/Info';
import Btn from '../components/Btn';
import Spinner from '../components/Spinner';

export default (Observer = props => (
  <View style={[styles.container]}>
    <View
      style={{
        alignItems: 'center',
        flex: 1,
      }}
    >
      {(props.isObserverLoading && <Spinner />) ||
        (!props.isObserverLoading &&
          props.observer && (
            <PlayerInfo
              imgUri={props.observer.info.imgUri}
              name={props.observer.info.name}
            />
          )) ||
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
              padding: 3,
              width: 'auto',
              height: 13,
              backgroundColor: '#1da1f2',
            }}
            txt={`${(props.observer && 'Change Observer') || 'Add Observer'}`}
            onPress={props.onAdd}
          />
        </View>
      )}
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ fontStyle: 'italic', fontSize: 8 }}>
        {(props.observer &&
          ((props.observer.status == 'PENDING' &&
            `*Observing match request has been sent to ${
              props.observer.info.name
            }*`) ||
            (props.observer.status == 'ACCEPTED' &&
              `*${props.observer.info.name} accepted observing match*`) ||
            `*${props.observer.info.name} rejected observing match*`)) ||
          (props.roomOwner &&
            '*You should add an observer to record match details such as who scores goals and which team won*') ||
          (!props.roomOwner &&
            '*this observer will record match details such as who scores goals and which team won*')}
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
    // marginBottom: 20,
  },
});
