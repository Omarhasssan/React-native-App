/*eslint-disable */
import { DBHelpers } from '../helpers';
import { updateUser, getTeamById, updateTeam } from '../actions';
export const sendTeamRequest = (socket, team, playersId) => {
  playersId.map(playerId => {
    const Request = { teamName: team.name, teamId: team.id, playerId: playerId, status: 'PENDING' };
    DBHelpers.addRequest(Request);
    socket.emit('sendRequest', { userId: playerId, request: Request });
  });
};
export const getUserRequest = (socket, user) => dispatch => {
  DBHelpers.getUserRequest(user.id).then(userRequests => {
    let userReqs = userRequests.filter(req => req.status == 'PENDING');
    dispatch({
      type: 'USER_REQUESTS',
      userReqs,
    });
  });
  socket.on('requests', request => {
    dispatch({
      type: 'ADD_REQUEST',
      request: request,
    });
  });
};

export const acceptRequest = (user, request) => dispatch => {
  // add this team to user
  dispatch(updateUser(user, 'teamId', request.teamId));

  // add playerId to team
  DBHelpers.getTeamById(request.teamId).then(team => {
    if (team.playersId) updateTeam(team, 'playersId', [...team.playersId, request.playerId]);
    else updateTeam(team, 'playersId', [request.playerId]);
  });

  // UPDATE user request
  const updatedRequest = { ...request, status: 'ACCEPTED' };
  DBHelpers.updateRequest(request.id, updatedRequest);
  dispatch({
    type: 'ACCEPT_REQUEST',
    requestId: request.id,
  });
};
