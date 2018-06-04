import firebase from '../config/firebase';
/*eslint-disable */
var _ = require('lodash');

export const observingRequestsService = {
  removeObservingRequest,
  getObservingRequest,
  addObservingRequest,
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
function addObservingRequest(Request) {
  const req = { ...Request };
  const requestsRef = firebase
    .database()
    .ref('ObservingRequests')
    .push();
  req.id = requestsRef.key;
  return requestsRef.set(req).then(() => Promise.resolve(req.id));
}
