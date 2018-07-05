import { convertDateToYMDH } from '../helpers';
import {
  saveAndSendObservingRequest,
  setTeamMatch,
  removeObservingRequest,
  updateUserRoom,
} from '.';
import firebase from '../config/firebase';
import { usersService, roomsService, teamsService } from '../Service';
import { matchesService } from '../../functions/dist/server/Service/matchesService';
import { notifyRoomOwnerWithJoiningTeam } from './sendNotification-actions';

<<<<<<< HEAD
export const createRoom = (user, Name, socket) => dispatch => {
=======
export const createRoom = (user, Name) => (dispatch) => {
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
  // save room to database admin of el room and room details

  const room = {};
  room.teamOwner = user.teamId;
  room.name = Name;
  room.settings = { OwnerReady: false, GuestReady: false };
  roomsService.addRoom(room);
  // console.log('usr', user);
  teamsService.getTeamById(user.teamId).then(team => {
    const Room = { ...room, teamOwner: team };
    dispatch({
      type: 'CREATE_ROOM_BY_ROOM_ID',
      id: Room.id,
    });
    dispatch({
      type: 'ADD_ROOM',
      room: Room,
    });
    dispatch(updateUserRoom(user, Room));
  });
};
<<<<<<< HEAD
export const getRooms = () => dispatch => {
  return roomsService.getRooms().then(rooms => {
=======
export const getRooms = () => (dispatch) => {
  roomsService.getRooms().then((rooms) => {

>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
    dispatch({ type: 'ROOMS', rooms });
    Promise.resolve();
  });
};

export const updateRoomDB = (route, value) => {
  roomsService.updateRoom(route, value);
};
export const setJoinedRoom = room => dispatch => {
  dispatch({
    type: 'SET_JOINED_ROOM',
    room,
  });
};

<<<<<<< HEAD
export const updateRoom = (room, type, value, socket) => dispatch => {
=======
export const updateRoom = (room, type, value) => (dispatch) => {
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
  const updatedRoom = { ...room, [type]: value };
};
<<<<<<< HEAD
export const joinRoom = (room, team, socket) => dispatch => {
=======
export const joinRoom = (room, team) => (dispatch) => {
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
  // join roomSocket
  dispatch({
    type: 'CREATE_ROOM_BY_ROOM_ID',
    id: room.id,
  });
  // update in DB
  updateRoomDB(`Rooms/${room.id}/joinedTeam`, team.id);
  // update allRooms and room object in roomOwner and roomGuest
  dispatch(updateRoom(room, 'joinedTeam', team));
  dispatch(notifyRoomOwnerWithJoiningTeam(room.teamOwner.ownerId));
};
<<<<<<< HEAD
export const listenToRoomChanges = (user, socket) => dispatch => {
  dispatch({
    type: 'JOIN_ROOMS_CHANNEL',
  });
  // update ROOMS object
  socket.on('updateRooms', updatedRoom => {
    dispatch({
      type: 'UPDATE_ROOMS',
      room: { id: updatedRoom.id, updatedRoom },
    });
  });
  socket.on('roomAdded', addedRoom => {
    // IF THIS IS NOT THE USER THAT ADD  THIS ROOM THEN UPDATE HIS REDUCER
    if (addedRoom.id !== user.roomId) {
      dispatch({
        type: 'ADD_ROOM',
        room: addedRoom,
      });
    }
  });

  socket.on('updateRoom', updatedRoom => {
    // if the user is roomOwner
    console.log('in update Room Socet');
    if (updatedRoom.id === user.roomId) {
      console.log('update mycreatdRoom');
      dispatch({
        type: 'UPDATE_CREATED_ROOM',
        room: { id: updatedRoom.id, updatedRoom },
      });
    }
    // if guest
    else {
      console.log('update myjoinedRoom');
=======
export const listenToRoomChanges = (user) => (dispatch) => {
  dispatch({
    type: 'JOIN_ROOMS_CHANNEL',
  });
  
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d

  
  let first = true;
  firebase
    .database()
    .ref('Rooms')
    .on('child_added', room => {
      room = room.toJSON();
      firebase
        .database()
        .ref(`${'Rooms'}/${room.id}/${'settings'}/${'observer'}/${'status'}`)
        .on('value', async status => {
          // should return req status and roomId
          if (first) first = false;
          else {
            const updatedRoom = await roomsService.getRoomById(room.id);
<<<<<<< HEAD
            dispatch(
              updateRoom(updatedRoom, 'settings', updatedRoom.settings, socket)
            );
=======
            dispatch(updateRoom(updatedRoom, 'settings', updatedRoom.settings));
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
            first = false;
          }
        });
    });
 
};

<<<<<<< HEAD
export const setRoomDate = (room, date, socket) => dispatch => {
=======
export const setRoomDate = (room, date) => (dispatch) => {
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
  updateRoomDB(`Rooms/${room.id}/settings/date`, date);
  dispatch(updateRoom(room, 'settings', { ...room.settings, date }));
};
<<<<<<< HEAD
export const setRoomLocation = (room, location, socket) => dispatch => {
  updateRoomDB(`Rooms/${room.id}/settings/location/address`, location.address);
  updateRoomDB(
    `Rooms/${room.id}/settings/location/latitude`,
    location.latitude
  );
  updateRoomDB(
    `Rooms/${room.id}/settings/location/longitude`,
    location.longitude
  );
  dispatch(
    updateRoom(room, 'settings', { ...room.settings, location }, socket)
  );
};
export const leaveRoom = (room, socket) => dispatch => {
=======
export const setRoomLocation = (room, location) => (dispatch) => {
  updateRoomDB(`Rooms/${room.id}/settings/location/address`, location.address);
  updateRoomDB(`Rooms/${room.id}/settings/location/latitude`, location.latitude);
  updateRoomDB(`Rooms/${room.id}/settings/location/longitude`, location.longitude);
  dispatch(updateRoom(room, 'settings', { ...room.settings, location }));
};
export const leaveRoom = (room) => (dispatch) => {
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
  updateRoomDB(`Rooms/${room.id}/joinedTeam`, null);
  dispatch(updateRoom(room, 'joinedTeam', null));
};

<<<<<<< HEAD
export const setRoomObserver = (room, observerId, socket) => dispatch => {
=======
export const setRoomObserver = (room, observerId) => (dispatch) => {
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
  // updateRoom in DB AND REDUCER w bt send request lel observer
  if (observerId) {
    updateRoomDB(`Rooms/${room.id}/settings/observer/id`, observerId);
    updateRoomDB(`Rooms/${room.id}/settings/observer/status`, 'PENDING');
    // law kan f observer abl kda w hasl change -> this.observer != el observer l fat
    if (
      room.settings &&
      room.settings.observer &&
      room.settings.observer.info.id != observerId
    ) {
      // then remove request l observer l fat mn l database
      // given el roomId wl observerId u can remove it from reducer and database
      // because i dnt have requestId
<<<<<<< HEAD
      dispatch(
        removeObservingRequest(room.id, room.settings.observer.info.id, socket)
      );
    }
    dispatch(saveAndSendObservingRequest(room, observerId, socket));
    usersService.getUserById(observerId).then(user => {
      dispatch(
        updateRoom(
          room,
          'settings',
          {
            ...room.settings,
            observer: { info: { ...user }, status: 'PENDING' },
          },
          socket
        )
      );
    });
  } else {
    dispatch(
      removeObservingRequest(room.id, room.settings.observer.info.id, socket)
    );
    updateRoomDB(`Rooms/${room.id}/settings/observer`, null);
    dispatch(
      updateRoom(room, 'settings', { ...room.settings, observer: {} }, socket)
    );
  }
};
export const setOwnerReady = (room, val, socket) => dispatch => {
  dispatch(
    updateRoom(room, 'settings', { ...room.settings, OwnerReady: val }, socket)
  );
};
export const setGuestReady = (room, val, socket) => dispatch => {
  dispatch(
    updateRoom(room, 'settings', { ...room.settings, GuestReady: val }, socket)
  );
};
export const setRoomMatch = (room, socket) => dispatch => {
=======
      dispatch(removeObservingRequest(room.id, room.settings.observer.info.id));
    }
    dispatch(saveAndSendObservingRequest(room, observerId));
    usersService.getUserById(observerId).then((user) => {
      dispatch(updateRoom(
        room,
        'settings',
        { ...room.settings, observer: { info: { ...user }, status: 'PENDING' } },
      ));
    });
  } else {
    dispatch(removeObservingRequest(room.id, room.settings.observer.info.id));
    updateRoomDB(`Rooms/${room.id}/settings/observer`, null);
    dispatch(updateRoom(room, 'settings', { ...room.settings, observer: {} }));
  }
};
export const setOwnerReady = (room, val) => (dispatch) => {
  dispatch(updateRoom(room, 'settings', { ...room.settings, OwnerReady: val }));
};
export const setGuestReady = (room, val) => (dispatch) => {
  dispatch(updateRoom(room, 'settings', { ...room.settings, GuestReady: val }));
};
export const setRoomMatch = (room) => (dispatch) => {
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
  const dateObj = convertDateToYMDH(room.settings.date);
  const matchSettings = { ...room.settings };
  const homeTeamMatch = {
    oponnentTeam: room.joinedTeam,
    date: dateObj,
    ...matchSettings.settings,
  };
  const awayTeamMatch = {
    oponnentTeam: room.teamOwner,
    date: dateObj,
    ...matchSettings.settings,
  };
  const matchDB = {
    homeTeam: room.teamOwner.id,
    awayTeam: room.joinedTeam.id,
    date: dateObj,
    location: room.settings.location,
    observer: room.settings.observer.info.id,
  };
  matchesService.addMatch(matchDB).then(matchId => {
    homeTeamMatch.id = matchId;
    awayTeamMatch.id = matchId;
    dispatch(setTeamMatch(homeTeamMatch, room.teamOwner));
    dispatch(setTeamMatch(awayTeamMatch, room.joinedTeam));
  });
};
