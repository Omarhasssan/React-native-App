import firebase from '../config/firebase';
/*eslint-disable */
var _ = require('lodash');

import { teamsService, usersService, roomsService } from '../Service';
export const requestsService = {
  getUserRequest,
  updateRequest,
};
function getTeamRequests(userId) {
  const teamRequests = [];
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('TeamRequests')
      .once('value', async snapshot => {
        const reqs = snapshot.toJSON();
        for (index in reqs) {
          const newReq = {};
          if (
            reqs[index].playerId == userId &&
            reqs[index].status == 'PENDING'
          ) {
            newReq.team = await teamsService.getTeamById(reqs[index].teamId);
            newReq.status = reqs[index].status;
            newReq.type = 'joinTeam';
            newReq.player = await usersService.getUserById(
              reqs[index].playerId
            );

            newReq.id = reqs[index].id;
            teamRequests.push(newReq);
          }
        }
      });
  });
}
function getUserRequest(userId) {
  const arr = { teamRequests: [], observingRequests: [] };
  return new Promise((resolve, reject) => {
    return firebase
      .database()
      .ref('TeamRequests')
      .once('value')
      .then(async snapshot => {
        const reqs = snapshot.val();

        for (index in reqs) {
          const newReq = {};
          if (
            reqs[index].playerId == userId &&
            reqs[index].status == 'PENDING'
          ) {
            newReq.team = await teamsService.getTeamById(reqs[index].teamId);
            newReq.status = reqs[index].status;
            newReq.type = 'joinTeam';
            newReq.player = await usersService.getUserById(
              reqs[index].playerId
            );

            newReq.id = reqs[index].id;

            arr.teamRequests.push(newReq);
          }
        }
        return Promise.resolve();
      })
      .then(() => {
        return firebase
          .database()
          .ref('ObservingRequests')
          .once('value')
          .then(async snapshot => {
            const reqs = snapshot.toJSON();
            for (index in reqs) {
              const newReq = {};
              if (
                reqs[index].playerId == userId &&
                reqs[index].status == 'PENDING'
              ) {
                newReq.room = await roomsService.getRoomById(
                  reqs[index].roomId
                );
                newReq.status = reqs[index].status;
                newReq.type = 'observing';
                newReq.player = await usersService.getUserById(
                  reqs[index].playerId
                );
                newReq.id = reqs[index].id;
                arr.observingRequests.push(newReq);
              }
            }

            return Promise.resolve();
          });
      })
      .then(() => {
        resolve(arr);
      });
  });
}

function updateRequest(requestId, reqType) {
  if (reqType == 'joinTeam') {
    return firebase
      .database()
      .ref(`${'TeamRequests'}/${requestId}/${'status'}`)
      .set('ACCEPTED');
  }
  return firebase
    .database()
    .ref(`${'ObservingRequests'}/${requestId}/${'status'}`)
    .set('ACCEPTED');
}
