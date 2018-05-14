import { AsyncStorage } from 'react-native';
import { DBHelpers } from '../helpers';
import { updateUserTeam, updateUserRoleToCaptain } from './user-actions';
import { sendJoiningTeamRequest } from '.';
import Player from '../components/Player';
/*eslint-disable */

// implement getTeams
export const getTeams = () => dispatch => {
  DBHelpers.getTeams().then(teams => {
    dispatch({ type: 'TEAMS', teams });
  });
};
export const createTeamWithSendingRequests = (user, teamName, playersId, socket) => dispatch => {
  let team = { name: teamName };
  DBHelpers.addTeam(team);
  dispatch({
    type: 'ADD_TEAM',
    team,
  });
  dispatch({
    type: 'CREATE_ROOM_BY_TEAM_ID',
    id: team.id,
  });

  dispatch(updateUserTeam(user.id, team.id));
  dispatch(updateUserRoleToCaptain(user));
  dispatch(sendJoiningTeamRequest(team, playersId, socket));
};
export const getTeam = teamId => dispatch => {
  dispatch({ type: 'GET_TEAM', teamId });
};

export const onTeamHasNewPlayer = () => dispatch => {
  DBHelpers.onTeamHasNewPlayer().then(team => {
    dispatch({
      type: 'UPDATE_TEAM_PLAYERS',
      payload: { teamId: team.id, player: team.player },
    });
  });
};

export const setTeamName = teamName => dispatch => {
  dispatch({ type: 'SET_TEAM_NAME', teamName });
};
export const setTeamPlayers = teamPlayers => dispatch => {
  dispatch({ type: 'SET_TEAM_PLAYERS', teamPlayers });
};
