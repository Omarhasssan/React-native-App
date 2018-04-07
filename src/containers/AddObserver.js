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
} from '../actions';

const mapStateToProps = ({
  players, checkedItems, roomsReducer, socket,
}) => ({
  players,
  checkedItems,
  room: roomsReducer.curntRoom,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(withSearchContainer(
  ({ onGetPlayers }) => onGetPlayers(),
  ({ players }) => players,
  null,
  (observerId, { room, setObserver, socket }) => {
    if (Object.keys(observerId).length > 0) setObserver(room, ...Object.keys(observerId), socket);
    else setObserver(room, null, socket);
  },
  ({ room, loadCheckedItems }) =>
    (room.settings.observer && room.settings.observer.id
      ? loadCheckedItems(Object.assign([], { [room.settings.observer.id]: true }))
      : null),
  {
    singleCheck: true,
  },
));
