import firebase from '../config/firebase';
import { validateSignUpForm } from './FormValidation';
/*eslint-disable */
var _ = require('lodash');

export const DBHelpers = {
  getRooms,
  getRequestByteamId,
  saveUser,
  findByName,
  checkUserFound,
  getUsers,
  updateUser,
  addTeam,
  addTeamRequest,
  getUserRequest,
  getTeamById,
  getRequestById,
  updateRequest,
  updateTeam,
  addRoom,
  getUserById,
  updateRoom,
  getTeams,
  updateTeamPlayers,
  onRequestStatusChanged,
  getRoomById,
  addObservingRequest,
  removeObservingRequest,
  getObservingRequest,
  onTeamHasNewPlayer,
  onUserHasTeam,
  onUserHasMatchesToObserve,
  onRoomObserverStatusChanged,
};
function removeObservingRequest(reqId) {
  firebase
    .database()
    .ref(`${'ObservingRequests'}/${reqId}`)
    .remove();
}

function getObservingRequest(roomId, userId) {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('ObservingRequests')
      .once('value', snapshot => {
        const reqs = snapshot.toJSON();
        for (i in reqs) {
          if (reqs[i].roomId == roomId && reqs[i].playerId == userId) return resolve(reqs[i]);
        }
      });
  });
}
function getUserRequest(userId) {
  let arr = { teamRequests: [], observingRequests: [] };
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('TeamRequests')
      .once('value', async snapshot => {
        const reqs = snapshot.toJSON();
        for (index in reqs) {
          let newReq = {};
          if (reqs[index].playerId == userId && reqs[index].status == 'PENDING') {
            newReq.team = await getTeamById(reqs[index].teamId);
            newReq.status = reqs[index].status;
            newReq.type = 'joinTeam';
            newReq.player = await getUserById(reqs[index].playerId);

            newReq.id = reqs[index].id;
            arr.teamRequests.push(newReq);
          }
        }
        firebase
          .database()
          .ref('ObservingRequests')
          .once('value', async snapshot => {
            const reqs = snapshot.toJSON();
            for (index in reqs) {
              let newReq = {};
              if (reqs[index].playerId == userId && reqs[index].status == 'PENDING') {
                newReq.room = await getRoomById(reqs[index].roomId);
                newReq.status = reqs[index].status;
                newReq.type = 'observing';
                newReq.player = await getUserById(reqs[index].playerId);
                newReq.id = reqs[index].id;
                arr.observingRequests.push(newReq);
              }
            }
            resolve(arr);
          });
      });
  });
}
function getUsers() {
  let arr = [];
  return new Promise((resolve, reject) => {
    return firebase
      .database()
      .ref('users')
      .once('value', snapshot => {
        snapshot.forEach(user => {
          arr.push(user.toJSON());
        });
        return resolve(arr);
      });
  });
}
function getRoomById(roomId) {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`${'Rooms'}/${roomId}`)
      .once('value', async snapshot => {
        const room = snapshot.toJSON();
        let newroom = {};

        newroom.teamOwner = await getTeamById(room.teamOwner);
        newroom.name = room.name;
        newroom.id = room.id;

        if (room.joinedTeam) {
          newroom.joinedTeam = await getTeamById(room.joinedTeam);
        }

        if (room.settings && _.has(room.settings, 'observer')) {
          newroom.settings = { observer: { info: {}, status: '' } };
          newroom.settings.observer.info = await getUserById(room.settings.observer.id);
          newroom.settings.observer.status = room.settings.observer.status;
        }

        if (room.settings && _.has(room.settings, 'date')) {
          newroom.settings = { ...newroom.settings, date: '' };
          newroom.settings.date = room.settings.date;
        }
        if (room.settings && _.has(room.settings, 'location')) {
          newroom.settings = { ...newroom.settings, location: '' };
          newroom.settings.location = room.settings.location;
        }
        
        resolve(newroom);
      });
  });
}
async function getRooms() {
  let arr = [],
    res;
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('Rooms')
      .once('value', async snapshot => {
        let rooms = snapshot.toJSON();
        for (const indx in rooms) {
          let newroom = {};
          newroom.teamOwner = await getTeamById(rooms[indx].teamOwner);
          newroom.name = rooms[indx].name;
          newroom.id = rooms[indx].id;

          if (rooms[indx].joinedTeam) {
            newroom.joinedTeam = await getTeamById(rooms[indx].joinedTeam);
          }
          if (rooms[indx].settings && _.has(rooms[indx].settings, 'observer')) {
            newroom.settings = { observer: { info: {}, status: '' } };
            newroom.settings.observer.info = await getUserById(rooms[indx].settings.observer.id);

            newroom.settings.observer.status = rooms[indx].settings.observer.status;
          }

          if (rooms[indx].settings && _.has(rooms[indx].settings, 'date')) {
            newroom.settings = { ...newroom.settings, date: '' };
            newroom.settings.date = rooms[indx].settings.date;
          }

          if (rooms[indx].settings && _.has(rooms[indx].settings, 'location')) {
            newroom.settings = { ...newroom.settings, location: '' };
            newroom.settings.location = rooms[indx].settings.location;
          }

          arr.push(newroom);
        }
        resolve(arr);
      });
  });
}
async function getTeams() {
  let arr = [],
    res;
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('teams')
      .once('value', async snapshot => {
        let teams = snapshot.toJSON();
        for (indx in teams) {
          if (teams[indx].players) {
            for (i in teams[indx].players) {
              teams[indx].players[i] = await getUserById(teams[indx].players[i]);
            }
            teams[indx].players = Object.values(teams[indx].players);
          }
          arr.push(teams[indx]);
        }
        resolve(arr);
      });
  });
}
function onRequestStatusChanged() {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('TeamRequests')
      .on('child_changed', data => {
        let req = data.toJSON();
        if (req.status == 'ACCEPTED') {
          resolve(req);
        }
      });
  });
}
async function onTeamHasNewPlayer() {
  let teams = await getTeams();
  let teamsLen = teams.length;
  let cnt = 0;
  let first = true;
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('teams')
      .on('child_added', team => {
        cnt++;
        if (cnt >= teamsLen) first = false;
        team = team.toJSON();
        console.log('team_chiled_added', team.name);

        return firebase
          .database()
          .ref(`${'teams'}/${team.id}/${'players'}`)
          .on('child_added', async playerId => {
            let updatedTeam = {};
            if (!first) {
              console.log('player_chiled_added', playerId, 'teamName', team.name);
              updatedTeam.id = team.id;
              updatedTeam.player = await getUserById(playerId.toJSON());
              console.log('after await', updatedTeam.player);
              resolve(updatedTeam);
              console.log('after resolve');
            }
          });
      });
  });
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
              let updatedRoom = await getRoomById(room.id);
              resolve(updatedRoom);
              first = false;
            }
          });
      });
  });
}
async function onUserHasTeam(userId) {
  let first = true;
  let done = false;

  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`${'users'}/${userId}`)
      .on('value', async snap => {
        if (first) {
          first = false;
        } else {
          let user = snap.toJSON();
          if (user.teamId && !done) {
            let updatedUser = {};
            updatedUser.team = await getTeamById(user.teamId);
            done = true;
            resolve(updatedUser);
          }
        }
      });
  });
}
function onUserHasMatchesToObserve(userId) {
  return new Promise((resolve, reject) => {
    return firebase
      .database()
      .ref('MatchesToObserve')
      .on('child_added', async snapshot => {
        // have roomId , playerId
        let match = {};
        const data = snapshot.toJSON();
        if (userId == data.observerId) {
          const room = await getRoomById(data.roomId);
          match.firstTeam = room.teamOwner;
          if (room.joinedTeam) match.secondTeam = room.joinedTeam;
          if (room.settings.data) match.date = room.settings.date;
          if (room.settings.location) match.location = room.settings.location;
          resolve(match);
        }
      });
  });
}
function addTeamRequest(Request) {
  let req = { ...Request };
  const requestsRef = firebase
    .database()
    .ref('TeamRequests')
    .push();
  req.id = requestsRef.key;
  return requestsRef.set(req).then(() => Promise.resolve(req.id));
}
function addObservingRequest(Request) {
  let req = { ...Request };
  const requestsRef = firebase
    .database()
    .ref('ObservingRequests')
    .push();
  req.id = requestsRef.key;
  return requestsRef.set(req).then(() => Promise.resolve(req.id));
}
function addRoom(room) {
  const roomRef = firebase
    .database()
    .ref('Rooms')
    .push();
  room.id = roomRef.key;
  roomRef.set(room);
}
function addTeam(team) {
  const teamsRef = firebase
    .database()
    .ref('teams')
    .push();
  team.id = teamsRef.key;
  teamsRef.set(team);
}
function getTeamPlayers(teamId) {
  let arr = [];
  return new Promise((resolve, reject) => {
    return firebase
      .database()
      .ref(`${'teams'}/${teamId}/${'players'}`)
      .once('value', snapshot => {
        if (snapshot.toJSON() != null) return resolve(Object.values(snapshot.toJSON()));
        return resolve([]);
      });
  });
}
function updateTeamPlayers(teamId, playerId) {
  return getTeamPlayers(teamId).then(teamPlayers => {
    teamPlayers.push(playerId);
    firebase
      .database()
      .ref(`${'teams'}/${teamId}/${'players'}`)
      .set(teamPlayers);
  });
}
function updateTeam(route, value) {
  return firebase
    .database()
    .ref(`route`)
    .set(value);
}

function updateRoom(route, value) {
  return firebase
    .database()
    .ref(route)
    .set(value);
}
function updateUser(route, value) {
  return firebase
    .database()
    .ref(route)
    .set(value);
}
function getTeamById(teamId) {
  return new Promise((resolve, reject) => {
    return firebase
      .database()
      .ref(`${'teams'}/${teamId}`)
      .once('value', async snapshot => {
        const team = snapshot.toJSON();
        if (team.players) {
          for (const index in team.players) {
            team.players[index] = await getUserById(team.players[index]);
          }
        }
        return resolve(team);
      });
  });
}
function getUserById(userId) {
  return new Promise((resolve, reject) => {
    return firebase
      .database()
      .ref(`${'users'}/${userId}`)
      .once('value', async snapshot => {
        return resolve(snapshot.toJSON());
      });
  });
}
function getRequestById(requestId) {
  return new Promise((resolve, reject) => {
    return firebase
      .database()
      .ref(`${'TeamRequests'}/${requestId}`)
      .on('value', snapshot => {
        return resolve(snapshot.toJSON());
      });
  });
}
function getRequestByteamId(teamId) {
  let arr = [];
  return new Promise((resolve, reject) => {
    return firebase
      .database()
      .ref(`${'TeamRequests'}`)
      .on('value', snapshot => {
        let reqs = snapshot.toJSON();
        for (i in reqs) if (reqs[i].teamId == teamId) arr.push(reqs[i]);
        return resolve(arr);
      });
  });
}
function updateRequest(requestId, reqType) {
  if (reqType == 'joinTeam')
    return firebase
      .database()
      .ref(`${'TeamRequests'}/${requestId}/${'status'}`)
      .set('ACCEPTED');
  else
    return firebase
      .database()
      .ref(`${'ObservingRequests'}/${requestId}/${'status'}`)
      .set('ACCEPTED');
}

function saveUser(user) {
  return validateSignUpForm(user)
    .then(() =>
      firebase
        .auth()
        .signInAnonymously()
        .then(() => {
          const userRef = firebase
            .database()
            .ref('users')
            .push();
          user.id = userRef.key;
          userRef.set(user);
          return Promise.resolve(user);
        }),
    )
    .catch(errMsg => {
      return Promise.reject(errMsg);
    });
}

function checkUserFound(user) {
  return findByName(user.name, 'users')
    .then(returnedUser => {
      if (returnedUser.password == user.password) {
        console.log('here3');
        return Promise.resolve(returnedUser);
      }
      return Promise.reject();
    })
    .catch(() => {
      return Promise.reject();
    });
}

function findByName(name, tableName) {
  return new Promise((resolve, reject) => {
    return firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        firebase
          .database()
          .ref(tableName)
          .on('value', snapshot => {
            snapshot.forEach(data => {
              if (data.toJSON().name == name) return resolve(data.toJSON());
            });
            return reject();
          });
      });
  });
}
