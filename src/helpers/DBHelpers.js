import firebase from '../config/firebase';
import { validateSignUpForm } from './FormValidation';
/*eslint-disable */

export const DBHelpers = {
  saveUser,
  findByName,
  findUser,
};

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

          userRef.set(user);
          return Promise.resolve(user);
        }),
    )
    .catch(errMsg => {
      console.log('errMsg', errMsg);
      return Promise.reject(errMsg);
    });
}
function findUser(user) {
  return findByName(user.name)
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

function findByName(name) {
  return new Promise((resolve, reject) => {
    return firebase
      .database()
      .ref('users')
      .on('value', snapshot => {
        snapshot.forEach(user => {
          if (user.toJSON().name == name) return resolve(user.toJSON());
        });
        return reject();
      });
  });
}
