import { DBHelpers } from '../helpers';
import { updateUserTeam, updateUserRoleToCaptain } from './user-actions';
import { sendJoiningTeamRequest } from '.';
import firebase from '../config/firebase';
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

export const onTeamHasNewPlayer = () => async dispatch => {
  let teams = await DBHelpers.getTeams();
  let teamsLen = teams.length;
  let cnt = 0;
  let first = true;
  firebase
    .database()
    .ref('teams')
    .on('child_added', team => {
      cnt++;
      if (cnt > teamsLen) first = false;
      team = team.toJSON();
      firebase
        .database()
        .ref(`${'teams'}/${team.id}/${'players'}`)
        .on('child_added', async playerId => {
          let updatedTeam = {};
          if (!first) {
            const player = await DBHelpers.getUserById(playerId.toJSON());
            dispatch({
              type: 'UPDATE_TEAM_PLAYERS',
              payload: { teamId: team.id, player: player },
            });
          }
        });
    });
};

export const setTeamName = teamName => dispatch => {
  dispatch({ type: 'SET_TEAM_NAME', teamName });
};
export const setTeamPlayers = teamPlayers => dispatch => {
  dispatch({ type: 'SET_TEAM_PLAYERS', teamPlayers });
};
