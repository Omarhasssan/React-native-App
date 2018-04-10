import { AsyncStorage } from 'react-native';
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
  AsyncStorage.getItem('@User').then(user => {
    const updatedUser = JSON.parse(user);
    updatedUser.teamId = team.id;
    AsyncStorage.setItem('@User', JSON.stringify(updatedUser)).then(() => {
      console.log('update user success');
    });
  });
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

export const setTeamName = teamName => dispatch => {
  dispatch({ type: 'SET_TEAM_NAME', teamName });
};
export const setTeamPlayers = teamPlayers => dispatch => {
  dispatch({ type: 'SET_TEAM_PLAYERS', teamPlayers });
};
