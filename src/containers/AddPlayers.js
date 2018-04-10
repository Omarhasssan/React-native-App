import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import withSearchContainer from '../hocs/withSearchContainer';
import {
  getPlayers,
  addCheckedItem,
  setTeamPlayers,
  removeCheckedItem,
  clearCheckedItems,
} from '../actions';

const mapStateToProps = ({ players, checkedItems }) => ({
  players,
  checkedItems,
});
const mapDispatchToProps = dispatch => ({
  onGetPlayers() {
    dispatch(getPlayers());
  },
  onSetTeamPlayers(playersId) {
    console.log('pId', playersId);
    dispatch(setTeamPlayers(playersId));
  },
  addCheckedItem(key) {
    dispatch(addCheckedItem(key));
  },
  removeCheckedItem(key) {
    dispatch(removeCheckedItem(key));
  },
  clearCheckedItems() {
    dispatch(clearCheckedItems());
  },
});
const renderHeaderRight = (playersId = [], navigation, onSetTeamPlayers) => (
  <TouchableOpacity
    onPress={() => {
      onSetTeamPlayers(playersId);
      navigation.navigate('CreateTeamStepTwo');
    }}
  >
    <Text>Next</Text>
  </TouchableOpacity>
);
export default connect(mapStateToProps, mapDispatchToProps)(withSearchContainer(
  ({ onGetPlayers }) => onGetPlayers(),
  ({ players }) => players,
  (checkedPlayers, navigation, { onSetTeamPlayers }) =>
    renderHeaderRight(checkedPlayers, navigation, onSetTeamPlayers),
  () => [],
  () => [],
  {
    singleCheck: false,
  },
));
