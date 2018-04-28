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
};

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
        room.teamOwner = await getTeamById(room.teamOwner);
        if (room.joinedTeam) {
          room.joinedTeam = await getTeamById(room.joinedTeam);
        }
        if (room.settings && _.has(room.settings, 'observer')) {
          room.settings.observer = await getUserById(room.settings.observer.id);
        }
        resolve(room);
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
        for (indx in rooms) {
          rooms[indx].teamOwner = await getTeamById(rooms[indx].teamOwner);
          if (rooms[indx].joinedTeam) {
            rooms[indx].joinedTeam = await getTeamById(rooms[indx].joinedTeam);
          }
          if (rooms[indx].settings && _.has(rooms[indx].settings, 'observer')) {
            rooms[indx].settings.observer = await getUserById(rooms[indx].settings.observer.id);
          }
          arr.push(rooms[indx]);
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
function addTeamRequest(Request) {
  let req = { ...Request };
  const requestsRef = firebase
    .database()
    .ref('TeamRequests')
    .push();
  req.id = requestsRef.key;
  requestsRef.set(req).then;
}
function addObservingRequest(Request) {
  let req = { ...Request };
  const requestsRef = firebase
    .database()
    .ref('ObservingRequests')
    .push();
  req.id = requestsRef.key;
  requestsRef.set(req).then;
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
      .once('value', snapshot => {
        return resolve(snapshot.toJSON());
      });
  });
}
function getUserById(userId) {
  return new Promise((resolve, reject) => {
    return firebase
      .database()
      .ref(`${'users'}/${userId}`)
      .once('value', snapshot => {
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
  console.log('req', reqType);
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
      console.log('errMsg', errMsg);
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
