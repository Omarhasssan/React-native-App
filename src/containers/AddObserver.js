import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import withSearchContainer from '../hocs/withSearchContainer';
import withModel from '../hocs/withModel';

import {
  getPlayers,
  addCheckedItem,
  removeCheckedItem,
  clearCheckedItems,
  loadCheckedItems,
  setRoomObserver,
  hideObserverModel,
} from '../actions';

const _ = require('lodash');

const mapStateToProps = ({ players, checkedItems, roomsReducer }) => ({
  players,
  checkedItems,
  room: roomsReducer.createdRoom,
});
const mapDispatchToProps = dispatch => ({
  onGetPlayers() {
    dispatch(getPlayers());
  },
  loadCheckedItems(checkedItems) {
    dispatch(loadCheckedItems(checkedItems));
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
  setObserver(room, observerId) {
    dispatch(setRoomObserver(room, observerId));
  },
  closeModel() {
    dispatch(hideObserverModel());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withSearchContainer(
  ({ onGetPlayers }) => onGetPlayers(),
  ({ players }) => players,
  null,
  (observerId, { room, setObserver, closeModel }) => {
    if (Object.keys(observerId).length > 0) {
      setObserver(room, ...Object.keys(observerId));
      closeModel();
    } else setObserver(room, null);
  },
  ({ room, loadCheckedItems }) =>
    (_.has(room, 'settings') && room.settings.observer && room.settings.observer.info
      ? loadCheckedItems(Object.assign([], { [room.settings.observer.info.id]: true }))
      : null),
  {
    singleCheck: true,
  },
));
