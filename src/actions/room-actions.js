import { DBHelpers } from '../helpers';
import { updateUserRoom } from './user-actions';
import { AsyncStorage } from 'react-native';
import { sendObservingRequest } from './request-actions';

export const createRoom = (user, Name, socket) => (dispatch) => {
  // save room to database admin of el room and room details

  const room = {};
  room.teamOwner = user.team.id;
  room.name = Name;
  room.settings = {};
  DBHelpers.addRoom(room);
  // console.log('usr', user);
  DBHelpers.getTeamById(user.team.id).then((team) => {
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

    dispatch(updateUserRoom(user, Room));
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
export const setRoom = (room, userType) => (dispatch) => {
  if (userType === 'owner') {
    dispatch({
      type: 'SET_CREATED_ROOM',
      room,
    });
  } else {
    dispatch({
      type: 'SET_JOINED_ROOM',
      room,
    });
  }
};

export const updateRoom = (room, type, value, socket) => (dispatch) => {
  const updatedRoom = { ...room, [type]: value };
  socket.emit('roomUpdated', { updatedRoom });
};
export const joinRoom = (room, user, socket) => (dispatch) => {
  // join roomSocket
  dispatch({
    type: 'CREATE_ROOM_BY_ROOM_ID',
    id: room.id,
  });
  // update in DB
  updateRoomDB(`Rooms/${room.id}/joinedTeam`, user.team.id);
  // update allRooms and room object in roomOwner and roomGuest
  dispatch(updateRoom(room, 'joinedTeam', user.team, socket));
};
export const listenToRoomChanges = (user, socket) => (dispatch) => {
  dispatch({
    type: 'JOIN_ROOMS_CHANNEL',
  });
  // update ROOMS object
  socket.on('updateRooms', (updatedRoom) => {
    dispatch({
      type: 'UPDATE_ROOMS',
      room: { id: updatedRoom.id, updatedRoom },
    });
  });
  socket.on('roomAdded', (addedRoom) => {
    // IF THIS IS NOT THE USER THAT ADD  THIS ROOM THEN UPDATE HIS REDUCER
    if (addedRoom.teamOwner.id !== user.team.id) {
      dispatch({
        type: 'ADD_ROOM',
        room: addedRoom,
      });
    }
  });

  socket.on('updateRoom', (updatedRoom) => {
    // if the user is roomOwner
    if (updatedRoom.id === user.room.id) {
      dispatch({
        type: 'UPDATE_CREATED_ROOM',
        room: { id: updatedRoom.id, updatedRoom },
      });
      // update in user reducer
      dispatch(updateUserRoom(user, updatedRoom));
    }
    // if guest
    else {
      dispatch({
        type: 'UPDATE_JOINED_ROOM',
        room: { id: updatedRoom.id, updatedRoom },
      });
    }
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
