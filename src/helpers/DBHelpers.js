import firebase from '../config/firebase';
import { validateSignUpForm } from './FormValidation';
/*eslint-disable */

export const DBHelpers = {
  saveUser,
  findByName,
  checkUserFound,
  getUsers,
  updateUser,
  addTeam,
};

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
function addTeam(team) {
  const teamsRef = firebase
    .database()
    .ref('teams')
    .push();
  team.id = teamsRef.key;
  teamsRef.set(team);
  return teamsRef.key;
}

function updateUser(userId, updateUser) {
  firebase
    .database()
    .ref(`${'users'}/${userId}`)
    .update(updateUser);
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
      .database()
      .ref(tableName)
      .on('value', snapshot => {
        snapshot.forEach(data => {
          if (data.toJSON().name == name) return resolve(data.toJSON());
        });
        return reject();
      });
  });
}
