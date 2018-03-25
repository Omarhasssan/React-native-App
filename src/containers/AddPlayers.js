import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import withSearchContainer from '../hocs/withSearchContainer';
import { getPlayers } from '../actions';

const mapStateToProps = ({ players }) => ({
  players,
});
const mapDispatchToProps = dispatch => ({
  onGetPlayers() {
    dispatch(getPlayers());
  },
});
const renderHeaderRight = (playersId = {}, navigation) => (
  <TouchableOpacity onPress={() => navigation.navigate('CreateTeamStepTwo', { playersId })}>
    <Text>Next</Text>
  </TouchableOpacity>
);
export default connect(mapStateToProps, mapDispatchToProps)(withSearchContainer(
  ({ onGetPlayers }) => onGetPlayers(),
  ({ players }) => players,
  ({ checkedData, navigation }) => renderHeaderRight(checkedData, navigation),
));
