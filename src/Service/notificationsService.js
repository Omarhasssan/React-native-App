import firebase from '../config/firebase';

export const notificationsService = {
  updateNotifications,
  getUserNotifications,
};

function getUserNotifications(userId) {
  return firebase
    .database()
    .ref(`Notifications/${userId}`)
    .once('value');
}
async function updateNotifications(route, value) {
  firebase
    .database()
    .ref(route)
    .set(value);
}
