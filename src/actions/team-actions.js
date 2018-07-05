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
<<<<<<< HEAD

export const createTeamWithSendingRequests = (
  user,
  teamName,
  playersId,
  socket
) => async dispatch => {
=======
export const createTeamWithSendingRequests = (user, teamName, playersId) => async dispatch => {
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
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
<<<<<<< HEAD
  dispatch({
    type: 'CREATE_ROOM_BY_TEAM_ID',
    id: team.id,
  });
=======
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
  dispatch(updateUserTeam(user.id, team.id));
  dispatch(updateUserRoleToCaptain(user));
  dispatch(sendJoiningTeamRequest(team, playersId));
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

export const onTeamHasMatch = () => dispatch => {
  console.log('in onTeamHasMatch');
};

export const setTeamMatch = (match, team) => dispatch => {
  team.matches.push(match);
  //console.log('tmMatches', team.matches);
<<<<<<< HEAD
  socket.emit('teamHasMatch', {
    updatedMatches: team.matches,
    teamId: team.id,
  });
  teamsService.addMatchToTeam(team.id, match.id);
};

export const listenToTeamChanges = socket => dispatch => {
  singleton.onTeamHasPlayer = null;
=======
  //dispatch(notifyTeamPlayersWithNextMatch())
  teamsService.addMatchToTeam(team.id, match.id);
};

export const listenToTeamChanges = () => dispatch => {
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
  dispatch(onTeamHasNewPlayer());
  dispatch(onTeamHasMatch());
};
