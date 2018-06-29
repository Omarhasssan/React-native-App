/*eslint-disable */
import {
  usersService,
  observingRequestsService,
  requestsService,
  teamRequestsService,
} from '../Service';
import { sendObservingNotification } from '.';
import {
  sendNormalJoiningTeamNotification,
  sendOfflineJoiningTeamNotification,
} from './sendNotification-actions';
export const sendJoiningTeamRequest = (team, playersId) => dispatch => {
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
    });
    dispatch(sendNormalJoiningTeamNotification(playerId));
  });
  // dispatch(sendOfflineJoiningTeamNotification(playersId))
};
export const removeObservingRequest = (roomId, observerId) => dispatch => {
  observingRequestsService.getObservingRequest(roomId, observerId).then(req => {
    observingRequestsService.removeObservingRequest(req.id);
   
  });
};

export const saveAndSendObservingRequest = (room, observerId) => dispatch => {
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
  requestsService.getUserRequest(user.id).then(userRequests => {
    dispatch({
      type: 'USER_REQUESTS',
      userReqs: userRequests,
    });
  });

  // realtime
  
  
};

export const acceptRequest = (request) => dispatch => {
  requestsService.updateRequest(request.id, request.type);
  if (request.type == 'joinTeam')
    dispatch({
      type: 'ACCEPT_TEAM_REQUEST',
      requestId: request.id,
    });
  else {
    fetch('https://us-central1-squad-builder.cloudfunctions.net/req/acceptObservingRoom', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    }).then(res => {
      console.log('res');
      // dispatch({
      //   type: 'ACCEPT_OBSERVING_REQUEST',
      //   requestId: request.id,
      // });
    });
  }
};
