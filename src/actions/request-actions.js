/*eslint-disable */
import {
  usersService,
  observingRequestsService,
  requestsService,
  teamRequestsService,
} from '../Service';

import {
  sendObservingNotification,
  sendNormalJoiningTeamNotification,
  sendOfflineJoiningTeamNotification,
} from '.';
export const sendJoiningTeamRequest = (team, playersId, socket) => dispatch => {
  playersId.map(async playerId => {
    const DBRequest = {
      teamId: team.id,
      playerId: playerId,
      status: 'PENDING',
    };

    teamRequestsService.addTeamRequest(DBRequest).then(async reqId => {
      const req = {
        id: reqId,
        type: 'joinTeam',
        team: team,
        player: await usersService.getUserById(playerId),
        status: 'PENDING',
      };
      dispatch(sendNormalJoiningTeamNotification(playerId));
      dispatch(socket.emit('sendRequest', { userId: playerId, request: req }));
    });
  });
  dispatch(sendOfflineJoiningTeamNotification(playersId));
};
export const removeObservingRequest = (
  roomId,
  observerId,
  socket
) => dispatch => {
  // get requestId given roomId and observerId then remove it from db and send reqId with socket to update userReducer
  observingRequestsService.getObservingRequest(roomId, observerId).then(req => {
    observingRequestsService.removeObservingRequest(req.id);
    socket.emit('removeRequest', {
      userId: observerId,
      request: { id: req.id, type: 'observing' },
    });
  });
};

export const saveAndSendObservingRequest = (
  room,
  observerId,
  socket
) => dispatch => {
  const DBRequest = {
    playerId: observerId,
    roomId: room.id,
    status: 'PENDING',
  };

  observingRequestsService.addObservingRequest(DBRequest).then(reqId => {
    const Request = {
      id: reqId,
      status: 'PENDING',
      room: room,
      playerId: observerId,
    };
    socket.emit('sendRequest', { userId: observerId, request: Request });
  });

  dispatch(sendObservingNotification(observerId, 'observingNotification'));
};
export const getUserRequest = (socket, user) => dispatch => {
  //from database

  return requestsService.getUserRequest(user.id).then(userRequests => {
    dispatch({
      type: 'USER_REQUESTS',
      userReqs: userRequests,
    });
    socket.on('removeRequest', request => {
      if (request.type == 'observing') {
        dispatch({
          type: 'REMOVE_OBSERVING_REQUEST',
          requestId: request.id,
        });
      }
    });
    socket.on('requests', request => {
      if (request.type == 'joinTeam')
        dispatch({
          type: 'ADD_TEAM_REQUEST',
          request: request,
        });
      else
        dispatch({
          type: 'ADD_OBSERVING_REQUEST',
          request: request,
        });
    });
    return Promise.resolve();
  });

  // realtime
};

export const acceptRequest = (request, socket) => dispatch => {
  requestsService.updateRequest(request.id, request.type);
  if (request.type == 'joinTeam')
    dispatch({
      type: 'ACCEPT_TEAM_REQUEST',
      requestId: request.id,
    });
  else {
    fetch(
      'https://us-central1-squad-builder.cloudfunctions.net/req/acceptObservingRoom',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      }
    ).then(res => {
      console.log('=> OBSERVING REQUEST ACCEPTED ;)');
      // dispatch({
      //   type: 'ACCEPT_OBSERVING_REQUEST',
      //   requestId: request.id,
      // });
    });
  }
};
