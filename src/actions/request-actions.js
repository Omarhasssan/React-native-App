/*eslint-disable */
import {
  usersService,
  observingRequestsService,
  requestsService,
  teamRequestsService,
} from '../Service';
<<<<<<< HEAD

import {
  sendObservingNotification,
  sendNormalJoiningTeamNotification,
  sendOfflineJoiningTeamNotification,
} from '.';
export const sendJoiningTeamRequest = (team, playersId, socket) => dispatch => {
=======
import { sendObservingNotification } from '.';
import {
  sendNormalJoiningTeamNotification,
  sendOfflineJoiningTeamNotification,
} from './sendNotification-actions';
export const sendJoiningTeamRequest = (team, playersId) => dispatch => {
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
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
<<<<<<< HEAD
      dispatch(sendNormalJoiningTeamNotification(playerId));
      dispatch(socket.emit('sendRequest', { userId: playerId, request: req }));
=======
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
    });
    dispatch(sendNormalJoiningTeamNotification(playerId));
  });
<<<<<<< HEAD
  dispatch(sendOfflineJoiningTeamNotification(playersId));
};
export const removeObservingRequest = (
  roomId,
  observerId,
  socket
) => dispatch => {
  // get requestId given roomId and observerId then remove it from db and send reqId with socket to update userReducer
=======
  // dispatch(sendOfflineJoiningTeamNotification(playersId))
};
export const removeObservingRequest = (roomId, observerId) => dispatch => {
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
  observingRequestsService.getObservingRequest(roomId, observerId).then(req => {
    observingRequestsService.removeObservingRequest(req.id);
   
  });
};

<<<<<<< HEAD
export const saveAndSendObservingRequest = (
  room,
  observerId,
  socket
) => dispatch => {
=======
export const saveAndSendObservingRequest = (room, observerId) => dispatch => {
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
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
  });

  dispatch(sendObservingNotification(observerId));
};
export const getUserRequest = ( user) => dispatch => {
  console.log('=> getUserRequests');
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
<<<<<<< HEAD
};

export const acceptRequest = (request, socket) => dispatch => {
=======
  
  
};

export const acceptRequest = (request) => dispatch => {
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
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
      console.log('res');
      // dispatch({
      //   type: 'ACCEPT_OBSERVING_REQUEST',
      //   requestId: request.id,
      // });
    });
  }
};
