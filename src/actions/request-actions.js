/*eslint-disable */
import { DBHelpers } from '../helpers';
import { updateUser, getTeamById, updateTeam } from '../actions';
export const sendJoiningTeamRequest = (team, playersId, socket) => dispatch => {
  playersId.map(async playerId => {
    const DBRequest = {
      teamId: team.id,
      playerId: playerId,
      status: 'PENDING',
    };

    DBHelpers.addTeamRequest(DBRequest);

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
  const DBRequest = {
    playerId: user.id,
    roomId: room.id,
    status: 'PENDING',
  };
  const Request = {
    type: 'observing',
    status: 'PENDING',
    room: room,
    player: user,
  };
  DBHelpers.addObservingRequest(DBRequest);
  socket.emit('sendRequest', { userId: user.id, request: Request });
};
export const getUserRequest = (socket, user) => dispatch => {
  //from database
  DBHelpers.getUserRequest(user.id).then(userRequests => {
    dispatch({
      type: 'USER_REQUESTS',
      userReqs: userRequests,
    });
  });

  // realtime
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
  DBHelpers.updateRequest(request.id, request.type);
  if (request.type == 'joinTeam')
    dispatch({
      type: 'ACCEPT_TEAM_REQUEST',
      requestId: request.id,
    });
  else
    dispatch({
      type: 'ACCEPT_OBSERVING_REQUEST',
      requestId: request.id,
    });
};
