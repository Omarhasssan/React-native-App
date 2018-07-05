import { validateSignUpForm } from '../helpers/FormValidation';
import firebase from '../config/firebase';
import { roomsService, teamsService } from '../Service';
/*eslint-disable */

const _ = require('lodash');

export const usersService = {
  saveUser,
  checkUserFound,
  findByName,
  getUserById,
  updateUser,
  onUserHasMatchesToObserve,
  onUserHasTeam,
  getUsers,
  getUserNotificationToken,
};

function saveUser(user) {
  return validateSignUpForm(user)
    .then(() => {
      const userRef = firebase
        .database()
        .ref('users')
        .push();
      user.id = userRef.key;
      userRef.set(user);
      return Promise.resolve(user);
    })
    .catch(errMsg => Promise.reject(errMsg));
}
function findByName(name, tableName) {
  return new Promise((resolve, reject) =>
    firebase
      .database()
      .ref(tableName)
      .on('value', snapshot => {

        snapshot.forEach(data => {
          if (data.toJSON().name == name) return resolve(data.toJSON());
        });
        return reject();
      })
  );
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
    .catch(() => Promise.reject());
}

function getUserById(userId) {
  const withoutMatches = arguments[1] == 'withoutTeamMatches';

  return new Promise((resolve, reject) =>
    firebase
      .database()
      .ref(`${'users'}/${userId}`)
      .once('value', async snapshot => {
        resolve(snapshot.toJSON());
      })
  );
}
function updateUser(route, value) {
  return firebase
    .database()
    .ref(route)
    .set(value);
}
function getUserNotificationToken(userId) {
  return firebase
    .database()
    .ref(`users/${userId}/notificationToken`)
    .once('value');
}
function onUserHasMatchesToObserve(userId) {
  return new Promise((resolve, reject) =>
    firebase
      .database()
      .ref('MatchesToObserve')
      .on('child_added', async snapshot => {
        // have roomId , playerId
        const match = {};
        const data = snapshot.toJSON();
        if (userId == data.observerId) {
          const room = await roomsService.getRoomById(data.roomId);
          match.firstTeam = room.teamOwner;
          if (room.joinedTeam) match.secondTeam = room.joinedTeam;
          if (room.settings.data) match.date = room.settings.date;
          if (room.settings.location) match.location = room.settings.location;
          resolve(match);
        }
      })
  );
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
          const user = snap.toJSON();
          if (user.teamId && !done) {
            const updatedUser = {};
            updatedUser.team = await teamsService.getTeamById(user.teamId);
            done = true;
            resolve(updatedUser);
          }
        }
      });
  });
}
function getUsers() {
  const arr = [];
  return new Promise((resolve, reject) =>
    firebase
      .database()
      .ref('users')
      .once('value', snapshot => {
        snapshot.forEach(user => {
          arr.push(user.toJSON());
        });
        return resolve(arr);
      })
  );
}
