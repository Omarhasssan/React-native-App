import { DBHelpers } from '../helpers';
import { updateUser } from './user-actions';
import { AsyncStorage } from 'react-native';
import { sendObservingRequest } from './request-actions';

export const createRoom = (user, Name, Location, socket) => (dispatch) => {
  // save room to database admin of el room and room details

  const room = {};
  room.teamOwner = user.teamId;
  room.name = Name;
  room.settings = {};
  room.settings.location = Location;
  DBHelpers.addRoom(room);

  DBHelpers.getTeamById(user.teamId).then((team) => {
    const Room = { ...room, teamOwner: team };
    dispatch({
      type: 'CREATE_ROOM_BY_ROOM_ID',
      id: Room.id,
    });
    dispatch({
      type: 'ADD_ROOM',
      room: Room,
    });

    socket.emit('addRoom', { addedRoom: Room });

    dispatch(updateUser(user, 'roomId', Room.id));
    AsyncStorage.getItem('@User').then((user) => {
      const updatedUser = JSON.parse(user);
      updatedUser.roomId = Room.id;
      AsyncStorage.setItem('@User', JSON.stringify(updatedUser)).then(() => {
        console.log('update user success');
      });
    });
  });
};
export const getRooms = () => (dispatch) => {
  DBHelpers.getRooms().then((rooms) => {
    dispatch({ type: 'ROOMS', rooms });
  });
};

export const updateRoomDB = (route, value) => {
  DBHelpers.updateRoom(route, value);
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
  updateRoomDB(`Rooms/${room.id}/joinedTeam`, user.teamId);
  DBHelpers.getTeamById(user.teamId).then((team) => {
    dispatch(updateRoom(room, 'joinedTeam', team, socket));
  });
};
export const setRoomDate = (room, date, socket) => (dispatch) => {
  updateRoomDB(`Rooms/${room.id}/settings/date`, date);
  dispatch(updateRoom(room, 'settings', { ...room.settings, date }, socket));
};
export const leaveRoom = (room, socket) => (dispatch) => {
  updateRoomDB(`Rooms/${room.id}/joinedTeam`, null);
  dispatch(updateRoom(room, 'joinedTeam', null, socket));
};
export const getRoom = roomId => (dispatch) => {
  dispatch({ type: 'GET_ROOM', roomId });
};
export const setRoomObserver = (room, observerId, socket) => (dispatch) => {
  if (observerId) {
    updateRoomDB(`Rooms/${room.id}/settings/observer`, observerId);
    DBHelpers.getUserById(observerId).then((user) => {
      dispatch(updateRoom(
        room,
        'settings',
        { ...room.settings, observer: { ...user, status: 'PENDING' } },
        socket,
      ));
    });
    sendObservingRequest(room, observerId, socket);
  } else {
    updateRoomDB(`Rooms/${room.id}/settings/observer`, null);
    dispatch(updateRoom(room, 'settings', { ...room.settings, observer: {} }, socket));
  }
};
