/*eslint-disable */
import { updateUser, getTeamById, updateTeam } from '.';
import { usersService, observingRequestsService, requestsService } from '../Service';
export const sendJoiningTeamRequest = (team, playersId, socket) => dispatch => {
  playersId.map(async playerId => {
    const DBRequest = {
      teamId: team.id,
      playerId: playerId,
      status: 'PENDING',
    };

    DBHelpers.addTeamRequest(DBRequest).then(async reqId => {
      const req = {
        id: reqId,
        type: 'joinTeam',
        team: team,
        player: await usersService.getUserById(playerId),
        status: 'PENDING',
      };
      dispatch(socket.emit('sendRequest', { userId: playerId, request: req }));
    });
  });
};
export const removeObservingRequest = (roomId, observerId, socket) => dispatch => {
  // get requestId given roomId and observerId then remove it from db and send reqId with socket to update userReducer
  observingRequestsService.getObservingRequest(roomId, observerId).then(req => {
    observingRequestsService.removeObservingRequest(req.id);
    socket.emit('removeRequest', {
      userId: observerId,
      request: { id: req.id, type: 'observing' },
    });
  });
};

export const saveAndSendObservingRequest = (room, observerId, socket) => dispatch => {
  const DBRequest = {
    playerId: observerId,
    roomId: room.id,
    status: 'PENDING',
  };

  DBHelpers.addObservingRequest(DBRequest).then(reqId => {
    const Request = {
      id: reqId,
      status: 'PENDING',
      room: room,
      playerId: observerId,
    };
    socket.emit('sendRequest', { userId: observerId, request: Request });
  });
};
export const getUserRequest = (socket, user) => dispatch => {
  //from database
  requestsService.getUserRequest(user.id).then(userRequests => {
    dispatch({
      type: 'USER_REQUESTS',
      userReqs: userRequests,
    });
  });

  // realtime
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
};

export const acceptRequest = (request, socket) => dispatch => {
  //DBHelpers.updateRequest(request.id, request.type);
  console.log('req', request);
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
