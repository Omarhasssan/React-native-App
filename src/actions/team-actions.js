import { DBHelpers } from '../helpers';
import { sendJoiningTeamRequest } from './request-actions';
import { updateUser } from './user-actions';
/*eslint-disable */

export const addTeam = (socket, user, teamName, playersId) => dispatch => {
  const team = DBHelpers.addTeam(teamName);
  dispatch({
    type: 'CREATE_TEAM',
    team,
  });
  dispatch(updateUser(user, 'teamId', team.id));
  sendJoiningTeamRequest(socket, team, playersId);
};

export const updateTeam = (team, type, value) => {
  const updatedTeam = { ...team, [type]: value };
  DBHelpers.updateTeam(team.id, updatedTeam);
  // should update in team reducer
  dispatch({
    type: 'UPDATE_TEAM',
    payload: { teamId: team.id, updatedTeam: updatedTeam },
  });
};
