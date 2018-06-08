import firebase from '../config/firebase';
import { sendJoiningTeamRequest, updateUserTeam, updateUserRoleToCaptain } from '.';
import { teamsService, usersService } from '../Service';
/*eslint-disable */

// implement getTeams
export const getTeams = () => dispatch => {
  teamsService.getTeams().then(teams => {
    dispatch({ type: 'TEAMS', teams });
  });
};
export const createTeamWithSendingRequests = (user, teamName, playersId, socket) => dispatch => {
  let team = {
    name: teamName,
    records: { wins: 0, losses: 0, draws: 0, gamesPlayed: 0, goals: 0 },
  };
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
  let teams = await teamsService.getTeams();
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
            const player = await usersService.getUserById(playerId.toJSON());
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

export const onTeamHasMatch = socket => dispatch => {
  console.log('in onTeamHasMatch');
  socket.on('teamHasMatch', data => {
    console.log('in socket , team has match');
    dispatch({
      type: 'SET_TEAM_MATCHES',
      payload: { teamId: data.teamId, updatedMatches: data.updatedMatches },
    });
  });
};

export const setTeamMatch = (match, team, socket) => dispatch => {
  team.matches.push(match);
  //console.log('tmMatches', team.matches);
  socket.emit('teamHasMatch', { updatedMatches: team.matches, teamId: team.id });
  teamsService.addMatchToTeam(team.id, match.id);
};

export const listenToTeamChanges = socket => dispatch => {
  dispatch(onTeamHasNewPlayer());
  dispatch(onTeamHasMatch(socket));
};
