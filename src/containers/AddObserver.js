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
  hideModel,
} from '../actions';

const _ = require('lodash');

const mapStateToProps = ({
  players, checkedItems, roomsReducer, socket,
}) => ({
  players,
  checkedItems,
  room: roomsReducer.createdRoom,
  socket,
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
  setObserver(room, observerId, socket) {
    dispatch(setRoomObserver(room, observerId, socket));
  },
  closeModel() {
    dispatch(hideModel());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withSearchContainer(
  ({ onGetPlayers }) => onGetPlayers(),
  ({ players }) => players,
  null,
  (observerId, {
    room, setObserver, socket, closeModel,
  }) => {
    if (Object.keys(observerId).length > 0) {
      setObserver(room, ...Object.keys(observerId), socket);
      closeModel();
    } else setObserver(room, null, socket);
  },
  ({ room, loadCheckedItems }) =>
    (_.has(room, 'settings') && room.settings.observer && room.settings.observer.info
      ? loadCheckedItems(Object.assign([], { [room.settings.observer.info.id]: true }))
      : null),
  {
    singleCheck: true,
  },
));
