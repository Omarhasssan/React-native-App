import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { setRoomMatch } from '../actions';
const SetMatch = ({ setRoomMatch, isAllRight }) => (
  <Btn
    txtStyle={[styles.normalBtnStyle, !isAllRight && styles.disabledBtn]}
    disabled={!isAllRight}
    containerStyle={{
      width: `${30}%`,
      alignItems: 'center',
      backgroundColor: '#1da1f2',
      alignSelf: 'center',
    }}
    txt={'Set Match !'}
    onPress={() => setRoomMatch(room, socket)}
  />
);
const styles = StyleSheet.create({
  normalBtnStyle: {
    fontStyle: 'bold',
    fontSize: 15,
    color: 'white',
  },
  disabledBtn: {
    color: 'white',
    opacity: '0.5',
  },
});
const mapDispatchToProps = dispatch => ({
  setRoomMatch(room, socket) {
    dispatch(setRoomMatch(room, socket));
  },
});
export default connect(null, mapDispatchToProps)(SetMatch);
