import firebase from '../config/firebase';
/*eslint-disable */
var _ = require('lodash');

export const teamRequestsService = {
  getRequestById,
  getRequestByteamId,
  addTeamRequest,
  onRequestStatusChanged,
};

function getRequestByteamId(teamId) {
  const arr = [];
  return new Promise((resolve, reject) =>
    firebase
      .database()
      .ref(`${'TeamRequests'}`)
      .on('value', snapshot => {
        const reqs = snapshot.toJSON();
        for (i in reqs) if (reqs[i].teamId == teamId) arr.push(reqs[i]);
        return resolve(arr);
      }),
  );
}

function getRequestById(requestId) {
  return new Promise((resolve, reject) =>
    firebase
      .database()
      .ref(`${'TeamRequests'}/${requestId}`)
      .on('value', snapshot => resolve(snapshot.toJSON())),
  );
}

function addTeamRequest(Request) {
  const req = { ...Request };
  const requestsRef = firebase
    .database()
    .ref('TeamRequests')
    .push();
  req.id = requestsRef.key;
  return requestsRef.set(req).then(() => Promise.resolve(req.id));
}
function onRequestStatusChanged() {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('TeamRequests')
      .on('child_changed', data => {
        const req = data.toJSON();
        if (req.status == 'ACCEPTED') {
          resolve(req);
        }
      });
  });
}
