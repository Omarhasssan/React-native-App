import firebase from '../config/firebase';
import {
  sendJoiningTeamRequest,
  updateUserTeam,
  updateUserRoleToCaptain,
} from '.';
import { teamsService, usersService } from '../Service';
import {
  notifyTeamPlayersWithNextMatch,
  notifyTeamTeamWithNextMatch,
} from './sendNotification-actions';
/*eslint-disable */

let singleton = { onTeamHasPlayer: null };
export const getTeams = () => dispatch => {
  return teamsService.getTeams().then(teams => {
    dispatch({ type: 'TEAMS', teams });
    Promise.resolve();
  });
};

export const createTeamWithSendingRequests = (
  user,
  teamName,
  playersId,
  socket
) => async dispatch => {
  const team = {
    name: teamName,
    records: { wins: 0, losses: 0, draws: 0, gamesPlayed: 0, goals: 0 },
    ownerId: user.id,
  };

  const teamId = await teamsService.addTeam(team);
  team.id = teamId;
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

export const onTeamHasNewPlayer = () => async (dispatch, getState) => {
  // BOOLEAN FIRST WILL TURN TO FALSE IF MY TEAM PLAYERS == DATABASE TEAM PLAYERS
  if (!singleton.onTeamHasPlayer) {
    singleton.onTeamHasPlayer = true;
    const team = getState().teamsReducer.curntTeam;
    let first = Object.keys(team.players).length == 0 ? false : true;
    let playersCnt = 0;
    if (team.id)
      firebase
        .database()
        .ref(`${'teams'}/${team.id}/${'players'}`)
        .on('child_added', async playerId => {
          if (!first) {
            let updatedTeam = {};
            const player = await usersService.getUserById(playerId.toJSON());
            dispatch({
              type: 'UPDATE_TEAM_PLAYERS',
              payload: { teamId: team.id, player: player },
            });
          } else {
            playersCnt++;
            if (playersCnt == Object.keys(team.players).length) first = false;
          }
        });
  }
};

export const setTeamName = teamName => dispatch => {
  dispatch({ type: 'SET_TEAM_NAME', teamName });
};
export const setTeamPlayers = teamPlayers => dispatch => {
  dispatch({ type: 'SET_TEAM_PLAYERS', teamPlayers });
};

export const onTeamHasMatch = socket => dispatch => {
  socket.on('teamHasMatch', data => {
    console.log('My Team HAS MATCHHHHHHHHH');
    dispatch({
      type: 'SET_TEAM_MATCHES',
      payload: { teamId: data.teamId, updatedMatches: data.updatedMatches },
    });
  });
};

export const setTeamMatch = (match, team, socket) => {
  let Team = JSON.parse(JSON.stringify(team));
  Team.matches.push(match);

  teamsService.addMatchToTeam(Team.id, match.id);
  socket.emit('teamHasMatch', {
    updatedMatches: Team.matches,
    teamId: Team.id,
  });
  notifyTeamTeamWithNextMatch(team.id);
};

export const listenToTeamChanges = socket => dispatch => {
  singleton.onTeamHasPlayer = null;
  dispatch(onTeamHasNewPlayer());
  dispatch(onTeamHasMatch(socket));
};
