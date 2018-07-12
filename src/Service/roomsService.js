import firebase from '../config/firebase';
/*eslint-disable */
var _ = require('lodash');

import { teamsService, usersService } from '../Service';

export const roomsService = {
  addRoom,
  onRoomObserverStatusChanged,
  getRoomById,
  getRooms,
  updateRoom,
};

function addRoom(room) {
  const roomRef = firebase
    .database()
    .ref('Rooms')
    .push();
  room.id = roomRef.key;
  roomRef.set(room);
}

function updateRoom(route, value) {
  return firebase
    .database()
    .ref(route)
    .set(value);
}
function onRoomObserverStatusChanged() {
  let first = true;
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('Rooms')
      .on('child_added', room => {
        console.log('room added');
        room = room.toJSON();
        firebase
          .database()
          .ref(`${'Rooms'}/${room.id}/${'settings'}/${'observer'}/${'status'}`)
          .on('value', async status => {
            console.log('roomObserver status changed');
            // should return req status and roomId
            if (first) first = false;
            else {
              console.log('not first');
              const updatedRoom = await getRoomById(room.id);
              resolve(updatedRoom);
              first = false;
            }
          });
      });
  });
}
async function getRoomDetails(room) {
  let newroom = { settings: { observer: {} } };
  newroom.name = room.name;
  newroom.id = room.id;

  let p1, p2, p3;
  p1 = teamsService.getTeamById(room.teamOwner);
  if (room.joinedTeam) p2 = teamsService.getTeamById(room.joinedTeam);
  if (room.settings && _.has(room.settings, 'observer')) {
    newroom.settings = { observer: { info: {}, status: '' } };

    p3 = usersService.getUserById(room.settings.observer.id);
  }

  await Promise.all([p1, p2, p3]).then(data => {
    newroom.teamOwner = data[0];
    if (data[1]) newroom.joinedTeam = data[1];
    if (data[2]) {
      newroom.settings.observer.info = data[2];
      newroom.settings.observer.status = room.settings.observer.status;
    }
  });
  if (room.settings && _.has(room.settings, 'date')) {
    newroom.settings = { ...newroom.settings, date: '' };
    newroom.settings.date = room.settings.date;
  }
  if (room.settings && _.has(room.settings, 'location')) {
    newroom.settings = { ...newroom.settings, location: '' };
    newroom.settings.location = room.settings.location;
  }
  newroom.settings.GuestReady = room.settings.GuestReady;
  newroom.settings.OwnerReady = room.settings.OwnerReady;
  return newroom;
}
function getRoomById(roomId) {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`${'Rooms'}/${roomId}`)
      .once('value', async snapshot => {
        const room = snapshot.toJSON();

        const newroom = await getRoomDetails(room);
        resolve(newroom);
      });
  });
}
async function getRooms() {
  let arr = [];
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('Rooms')
      .once('value', async snapshot => {
        const rooms = snapshot.toJSON();

        for (const indx in rooms) {
          const newroom = await getRoomDetails(rooms[indx]);
          arr.push(newroom);
        }
        resolve(arr);
      });
  });
}
