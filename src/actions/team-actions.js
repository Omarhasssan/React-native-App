import firebase from '../config/firebase';
import {
  sendJoiningTeamRequest,
  updateUserTeam,
  updateUserRoleToCaptain,
} from '.';
import { teamsService, usersService } from '../Service';
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
          console.log(
            '=> player child added BUT TILL I DONT KNOW IF U NEW ONE OR OLD HEHEHE '
          );
          if (!first) {
            console.log(
              '=> THIS IS A NEW PLAYER I GOT YOU HEHEE',
              playerId.val()
            );
            let updatedTeam = {};
            const player = await usersService.getUserById(playerId.toJSON());
            dispatch({
              type: 'UPDATE_TEAM_PLAYERS',
              payload: { teamId: team.id, player: player },
            });
          } else {
            console.log('=>IN CNT');
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
  socket.emit('teamHasMatch', {
    updatedMatches: team.matches,
    teamId: team.id,
  });
  teamsService.addMatchToTeam(team.id, match.id);
};

export const listenToTeamChanges = socket => dispatch => {
  singleton.onTeamHasPlayer = null;
  dispatch(onTeamHasNewPlayer());
  dispatch(onTeamHasMatch(socket));
};
