import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import withSearchContainer from '../hocs/withSearchContainer';
import { getPlayers, addCheckedItem, removeCheckedItem, clearCheckedItems } from '../actions';

const mapStateToProps = ({ players, checkedItems }) => ({
  players,
  checkedItems,
});
const mapDispatchToProps = dispatch => ({
  onGetPlayers() {
    dispatch(getPlayers());
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
const renderHeaderRight = (playersId = [], navigation) => (
  <TouchableOpacity onPress={() => navigation.navigate('CreateTeamStepTwo', { playersId })}>
    <Text>Next</Text>
  </TouchableOpacity>
);
export default connect(mapStateToProps, mapDispatchToProps)(withSearchContainer(
  ({ onGetPlayers }) => onGetPlayers(),
  ({ players }) => players,
  (checkedPlayers, navigation) => renderHeaderRight(checkedPlayers, navigation),
  () => [],
  () => [],
  {
    singleCheck: false,
  },
));
