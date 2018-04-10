import firebase from '../config/firebase';
import { validateSignUpForm } from './FormValidation';
/*eslint-disable */

export const DBHelpers = {
  getRooms,
  saveUser,
  findByName,
  checkUserFound,
  getUsers,
  updateUser,
  addTeam,
  addRequest,
  getUserRequest,
  getTeamById,
  getRequestById,
  updateRequest,
  updateTeam,
  addRoom,
  getUserById,
  updateRoom,
};

function getUserRequest(userId) {
  let arr = [];
  return new Promise((resolve, reject) => {
    return firebase
      .database()
      .ref('TeamRequests')
      .on('value', snapshot => {
        snapshot.forEach(request => {
          if (userId === request.toJSON().playerId) {
            arr.push(request.toJSON());
          }
        });
        return resolve(arr);
      });
  });
}
function getUsers() {
  let arr = [];
  return new Promise((resolve, reject) => {
    return firebase
      .database()
      .ref('users')
      .on('value', snapshot => {
        snapshot.forEach(user => {
          arr.push(user.toJSON());
        });
        return resolve(arr);
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
      .on('value', async snapshot => {
        let rooms = snapshot.toJSON();
        for (indx in rooms) {
          rooms[indx].teamOwner = await getTeamById(rooms[indx].teamOwner);
          res = await getTeamById(rooms[indx].joinedTeam);
          if (res) rooms[indx].joinedTeam = res;
          res = await getUserById(rooms[indx].settings.observer);
          if (res) rooms[indx].settings.observer = res;
          arr.push(rooms[indx]);
        }
        resolve(arr);
      });
  });
}
function addRequest(Request) {
  let req = Request;
  const requestsRef = firebase
    .database()
    .ref('TeamRequests')
    .push();
  req.id = requestsRef.key;
  requestsRef.set(req);
}
function addRoom(room) {
  const roomRef = firebase
    .database()
    .ref('Rooms')
    .push();
  room.id = roomRef.key;
  roomRef.set(room);
}
function addTeam(teamName) {
  let Team = { name: teamName, playersId: [] };
  const teamsRef = firebase
    .database()
    .ref('teams')
    .push();
  Team.id = teamsRef.key;
  teamsRef.set(Team);
  return Team;
}
function updateTeam(teamId, updateTeam) {
  return firebase
    .database()
    .ref(`${'teams'}/${teamId}`)
    .update(updateTeam);
}
function updateRoom(route, value) {
  return firebase
    .database()
    .ref(route)
    .set(value);
}
function updateUser(userId, updateUser) {
  return firebase
    .database()
    .ref(`${'users'}/${userId}`)
    .update(updateUser);
}
function getTeamById(teamId) {
  return new Promise((resolve, reject) => {
    return firebase
      .database()
      .ref(`${'teams'}/${teamId}`)
      .on('value', snapshot => {
        return resolve(snapshot.toJSON());
      });
  });
}
function getUserById(userId) {
  return new Promise((resolve, reject) => {
    return firebase
      .database()
      .ref(`${'users'}/${userId}`)
      .on('value', snapshot => {
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

function updateRequest(requestId, updatedRequest) {
  return firebase
    .database()
    .ref(`${'TeamRequests'}/${requestId}`)
    .update(updatedRequest);
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
