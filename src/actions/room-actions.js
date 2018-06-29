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

export const createRoom = (user, Name) => (dispatch) => {
  // save room to database admin of el room and room details

  const room = {};
  room.teamOwner = user.teamId;
  room.name = Name;
  room.settings = { OwnerReady: false, GuestReady: false };
  roomsService.addRoom(room);
  // console.log('usr', user);
  teamsService.getTeamById(user.teamId).then((team) => {
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
export const getRooms = () => (dispatch) => {
  roomsService.getRooms().then((rooms) => {

    dispatch({ type: 'ROOMS', rooms });
  });
};

export const updateRoomDB = (route, value) => {
  roomsService.updateRoom(route, value);
};
export const setJoinedRoom = room => (dispatch) => {
  dispatch({
    type: 'SET_JOINED_ROOM',
    room,
  });
};

export const updateRoom = (room, type, value) => (dispatch) => {
  const updatedRoom = { ...room, [type]: value };
};
export const joinRoom = (room, team) => (dispatch) => {
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
export const listenToRoomChanges = (user) => (dispatch) => {
  dispatch({
    type: 'JOIN_ROOMS_CHANNEL',
  });
  

  
  let first = true;
  firebase
    .database()
    .ref('Rooms')
    .on('child_added', (room) => {
      room = room.toJSON();
      firebase
        .database()
        .ref(`${'Rooms'}/${room.id}/${'settings'}/${'observer'}/${'status'}`)
        .on('value', async (status) => {
          // should return req status and roomId
          if (first) first = false;
          else {
            const updatedRoom = await roomsService.getRoomById(room.id);
            dispatch(updateRoom(updatedRoom, 'settings', updatedRoom.settings));
            first = false;
          }
        });
    });
 
};

export const setRoomDate = (room, date) => (dispatch) => {
  updateRoomDB(`Rooms/${room.id}/settings/date`, date);
  dispatch(updateRoom(room, 'settings', { ...room.settings, date }));
};
export const setRoomLocation = (room, location) => (dispatch) => {
  updateRoomDB(`Rooms/${room.id}/settings/location/address`, location.address);
  updateRoomDB(`Rooms/${room.id}/settings/location/latitude`, location.latitude);
  updateRoomDB(`Rooms/${room.id}/settings/location/longitude`, location.longitude);
  dispatch(updateRoom(room, 'settings', { ...room.settings, location }));
};
export const leaveRoom = (room) => (dispatch) => {
  updateRoomDB(`Rooms/${room.id}/joinedTeam`, null);
  dispatch(updateRoom(room, 'joinedTeam', null));
};

export const setRoomObserver = (room, observerId) => (dispatch) => {
  // updateRoom in DB AND REDUCER w bt send request lel observer
  if (observerId) {
    updateRoomDB(`Rooms/${room.id}/settings/observer/id`, observerId);
    updateRoomDB(`Rooms/${room.id}/settings/observer/status`, 'PENDING');
    // law kan f observer abl kda w hasl change -> this.observer != el observer l fat
    if (room.settings && room.settings.observer && room.settings.observer.info.id != observerId) {
      // then remove request l observer l fat mn l database
      // given el roomId wl observerId u can remove it from reducer and database
      // because i dnt have requestId
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
  const dateObj = convertDateToYMDH(room.settings.date);
  const matchSettings = { ...room.settings };
  const homeTeamMatch = { oponnentTeam: room.joinedTeam, date: dateObj, ...matchSettings.settings };
  const awayTeamMatch = { oponnentTeam: room.teamOwner, date: dateObj, ...matchSettings.settings };
  const matchDB = {
    homeTeam: room.teamOwner.id,
    awayTeam: room.joinedTeam.id,
    date: dateObj,
    location: room.settings.location,
    observer: room.settings.observer.info.id,
  };
  matchesService.addMatch(matchDB).then((matchId) => {
    homeTeamMatch.id = matchId;
    awayTeamMatch.id = matchId;
    dispatch(setTeamMatch(homeTeamMatch, room.teamOwner));
    dispatch(setTeamMatch(awayTeamMatch, room.joinedTeam));
  });
};
