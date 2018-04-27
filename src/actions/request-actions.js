/*eslint-disable */
import { DBHelpers } from '../helpers';
import { updateUser, getTeamById, updateTeam } from '../actions';
export const sendJoiningTeamRequest = (team, playersId, socket) => dispatch => {
  playersId.map(async playerId => {
    const DBRequest = {
      type: 'joinTeam',
      teamId: team.id,
      playerId: playerId,
      status: 'PENDING',
    };

    DBHelpers.addRequest(DBRequest);

    const req = {
      type: 'joinTeam',
      team: team,
      player: await DBHelpers.getUserById(playerId),
      status: 'PENDING',
    };
    dispatch(socket.emit('sendRequest', { userId: playerId, request: req }));
  });
};
export const sendObservingRequest = (room, user, socket) => {
  // const Request = {
  //   type: 'observing',
  //   status: 'PENDING',
  //   room: room,
  //   playerId: user.id,
  // };
  // socket.emit('sendRequest', { userId: user.id, request: Request });
};
export const getUserRequest = (socket, user) => dispatch => {
  //from database
  DBHelpers.getUserRequest(user.id).then(userRequests => {
    // for testing
    let userReqs = userRequests.filter(req => req.status == 'PENDING');
    dispatch({
      type: 'USER_REQUESTS',
      userReqs: userReqs,
    });
  });

  // realtime
  socket.on('requests', request => {
    dispatch({
      type: 'ADD_REQUEST',
      request: request,
    });
  });
};

export const acceptRequest = (request, socket) => dispatch => {
  DBHelpers.updateRequest(request.id);
  dispatch({
    type: 'ACCEPT_REQUEST',
    requestId: request.id,
  });
};
