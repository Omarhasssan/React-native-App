import { DBHelpers } from '../helpers';
import { updateUser } from './user-actions';
import { AsyncStorage } from 'react-native';

export const createRoom = (user, Name, Location, socket) => (dispatch) => {
  // save room to database admin of el room and room details

  const room = {};
  DBHelpers.getTeamById(user.teamId).then((team) => {
    room.teamOwner = team;
    room.name = Name;
    room.settings = {};
    room.settings.location = Location;

    DBHelpers.addRoom(room);

    dispatch({
      type: 'CREATE_ROOM_BY_ROOM_ID',
      id: room.id,
    });
    dispatch({
      type: 'ADD_ROOM',
      room,
    });

    socket.emit('addRoom', { addedRoom: room });

    dispatch(updateUser(user, 'roomId', room.id));
    AsyncStorage.getItem('@User').then((user) => {
      const updatedUser = JSON.parse(user);
      updatedUser.roomId = room.id;
      AsyncStorage.setItem('@User', JSON.stringify(updatedUser)).then(() => {
        console.log('update user success', updatedUser);
      });
    });
  });
};
export const getRooms = () => (dispatch) => {
  DBHelpers.getRooms().then(rooms => dispatch({ type: 'ROOMS', rooms }));
};

export const updateRoom = (room, type, value, socket) => (dispatch) => {
  const updatedRoom = { ...room, [type]: value };
  socket.emit('updateRoom', { updatedRoom });
};
export const listenToRoomChanges = socket => (dispatch) => {
  socket.on('roomUpdated', (updatedRoom) => {
    dispatch({
      type: 'UPDATE_ROOM',
      room: { id: updatedRoom.id, updatedRoom },
    });
  });
  socket.on('roomAdded', (addedRoom) => {
    dispatch({
      type: 'ADD_ROOM',
      room: addedRoom,
    });
  });
};
export const joinRoom = (user, room, socket) => (dispatch) => {
  if (room.teamOwnerId !== user.teamId) {
    DBHelpers.getTeamById(user.teamId).then((team) => {
      dispatch(updateRoom(room, 'joinedTeam', team, socket));
    });
  }
};
export const setRoomDate = (room, date, socket) => (dispatch) => {
  dispatch(updateRoom(room, 'settings', { ...room.settings, date }, socket));
};
export const leaveRoom = (room, socket) => (dispatch) => {
  dispatch(updateRoom(room, 'joinedTeam', null, socket));
};
export const getRoom = roomId => (dispatch) => {
  dispatch({ type: 'GET_ROOM', roomId });
};
export const setRoomObserver = (room, observerId, socket) => (dispatch) => {
  if (observerId) {
    DBHelpers.getUserById(observerId).then((user) => {
      dispatch(updateRoom(room, 'settings', { ...room.settings, observer: { ...user } }, socket));
    });
  } else {
    dispatch(updateRoom(room, 'settings', { ...room.settings, observer: {} }, socket));
  }
};
