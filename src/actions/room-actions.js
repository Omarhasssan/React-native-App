import { convertDateToYMDH } from '../helpers';
import {
  saveAndSendObservingRequest,
  setTeamMatch,
  removeObservingRequest,
  updateUserRoom,
} from '.';
import firebase from '../config/firebase';
import {
  usersService,
  roomsService,
  teamsService,
  observingMatchesService,
  matchesService,
} from '../Service';
let singleton = { onObserverStatusChanged: null };

export const createRoom = (user, Name, socket) => dispatch => {
  // save room to database admin of el room and room details

  const room = {};
  room.teamOwner = user.teamId;
  room.name = Name;
  room.settings = { OwnerReady: false, GuestReady: false };
  roomsService.addRoom(room);
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
    socket.emit('addRoom', { addedRoom: Room });
  });
};
export const getRooms = () => dispatch => {
  return roomsService.getRooms().then(rooms => {
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

export const updateRoom = (room, type, value, socket) => dispatch => {
  const updatedRoom = { ...room, [type]: value };
  socket.emit('roomUpdated', { updatedRoom });
};
export const joinRoom = (room, team, socket) => dispatch => {
  // join roomSocket
  dispatch({
    type: 'CREATE_ROOM_BY_ROOM_ID',
    id: room.id,
  });
  // update in DB
  updateRoomDB(`Rooms/${room.id}/joinedTeam`, team.id);
  // update allRooms and room object in roomOwner and roomGuest
  dispatch(updateRoom(room, 'joinedTeam', team, socket));
};
const onRoomObserverStatusChanged = (roomId, socket) => (
  dispatch,
  getState
) => {
  if (!singleton.onObserverStatusChanged) {
    singleton.onObserverStatusChanged = true;
    let first = true;
    firebase
      .database()
      .ref(`${'Rooms'}/${roomId}/${'settings'}/${'observer'}/${'status'}`)
      .on('value', async status => {
        // should return req status and roomId

        if (first) first = false;
        else if (status.val() && status.val() != 'PENDING') {
          dispatch(
            updateRoom(
              getState().roomsReducer.createdRoom,
              'settings',
              {
                ...getState().roomsReducer.createdRoom.settings,
                observer: {
                  ...getState().roomsReducer.createdRoom.settings.observer,
                  status: status.val(),
                },
              },
              socket
            )
          );
        }
      });
  }
};
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
    if (updatedRoom.id === user.roomId) {
      dispatch({
        type: 'UPDATE_CREATED_ROOM',
        room: { id: updatedRoom.id, updatedRoom },
      });
    }
    // if guest
    else {
      dispatch({
        type: 'UPDATE_JOINED_ROOM',
        room: { id: updatedRoom.id, updatedRoom },
      });
    }
  });
  dispatch(onRoomObserverStatusChanged(user.roomId, socket));
};

export const setRoomDate = (room, date, socket) => dispatch => {
  updateRoomDB(`Rooms/${room.id}/settings/date`, date);
  dispatch(updateRoom(room, 'settings', { ...room.settings, date }, socket));
};
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
  updateRoomDB(`Rooms/${room.id}/joinedTeam`, null);
  dispatch(updateRoom(room, 'joinedTeam', null, socket));
  socket.emit('leaveRoom', { roomId: room.id });
};

export const setRoomObserver = (room, observerId, socket) => dispatch => {
  // updateRoom in DB AND REDUCER w bt send request lel observer

  //TODO:START LOADING

  if (observerId) {
    dispatch({
      type: 'LOAD_OBSERVER_INFO_PENDING',
    });
    updateRoomDB(`Rooms/${room.id}/settings/observer/id`, observerId);
    updateRoomDB(`Rooms/${room.id}/settings/observer/status`, 'PENDING');
    // law kan f observer abl kda w hasl change -> this.observer != el observer l fat
    if (
      room.settings &&
      Object.keys(room.settings.observer).length &&
      room.settings.observer.info.id != observerId
    ) {
      // then remove request l observer l fat mn l database
      // given el roomId wl observerId u can remove it from reducer and database
      // because i dnt have requestId
      dispatch(
        removeObservingRequest(room.id, room.settings.observer.info.id, socket)
      );
    }
    dispatch(saveAndSendObservingRequest(room, observerId, socket));
    usersService.getUserById(observerId).then(user => {
      //TODO STOP LOADING
      setTimeout(() => {
        dispatch({
          type: 'LOAD_OBSERVER_INFO_SUCCESS',
        });
      }, 1000);
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
export const setRoomMatch = (room, socket) => async dispatch => {
  const dateObj = convertDateToYMDH(room.settings.date);
  let homeTeamMatch = {
    oponnentTeam: room.joinedTeam,
    ...room.settings,
    date: dateObj,
  };
  let awayTeamMatch = {
    oponnentTeam: room.teamOwner,
    ...room.settings,
    date: dateObj,
  };
  const matchDB = {
    homeTeam: room.teamOwner.id,
    awayTeam: room.joinedTeam.id,
    date: dateObj,
    location: room.settings.location,
    observer: room.settings.observer.info.id,
  };
  const matchId = await matchesService.addMatch(matchDB);
  homeTeamMatch.id = matchId;
  awayTeamMatch.id = matchId;
  setTeamMatch(homeTeamMatch, room.teamOwner, socket);
  setTeamMatch(awayTeamMatch, room.joinedTeam, socket);

  // OBSERVER LOGIC
  const observingMatch = {
    matchId: matchId,
  };
  observingMatchesService.addObservingMatch(
    observingMatch,
    room.settings.observer.info.id
  );
};
