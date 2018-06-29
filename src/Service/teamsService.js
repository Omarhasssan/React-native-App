/*eslint-disable */
import firebase from '../config/firebase';
import { matchesService, usersService } from '../Service';

const _ = require('lodash');

export const teamsService = {
  getTeams,
  onTeamHasNewPlayer,
  addTeam,
  getTeamPlayers,
  updateTeamPlayers,
  getTeamMatches,
  addMatchToTeam,
  getTeamById,
  updateTeam,
};

async function getTeams() {
  let arr = [];

  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('teams')
      .once('value', async snapshot => {
        const teams = snapshot.toJSON();
        for (indx in teams) {
          if (teams[indx].players) {
            for (i in teams[indx].players) {
              teams[indx].players[i] = await usersService.getUserById(teams[indx].players[i]);
            }
            teams[indx].players = Object.values(teams[indx].players);
          }
          arr.push(teams[indx]);
        }

        resolve(arr);
      });
  });
}
async function onTeamHasNewPlayer() {
  const teams = await getTeams();
  const teamsLen = teams.length;
  let cnt = 0;
  let first = true;
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('teams')
      .on('child_added', team => {
        cnt++;
        if (cnt >= teamsLen) first = false;
        team = team.toJSON();

        return firebase
          .database()
          .ref(`${'teams'}/${team.id}/${'players'}`)
          .on('child_added', async playerId => {
            const updatedTeam = {};
            if (!first) {
              updatedTeam.id = team.id;
              updatedTeam.player = await usersService.getUserById(playerId.toJSON());
              resolve(updatedTeam);
            }
          });
      });
  });
}
function addTeam(team) {
  const teamsRef = firebase
    .database()
    .ref('teams')
    .push();
  team.id = teamsRef.key;
  return teamsRef.set(team).then(() => Promise.resolve(teamsRef.key));
}
function getTeamPlayers(teamId) {
  const arr = [];
  return new Promise((resolve, reject) =>
    firebase
      .database()
      .ref(`${'teams'}/${teamId}/${'players'}`)
      .once('value', snapshot => {
        if (snapshot.toJSON() != null) return resolve(Object.values(snapshot.toJSON()));
        return resolve([]);
      }),
  );
}
function updateTeamPlayers(teamId, playerId) {
  return getTeamPlayers(teamId).then(teamPlayers => {
    teamPlayers.push(playerId);
    firebase
      .database()
      .ref(`${'teams'}/${teamId}/${'players'}`)
      .set(teamPlayers);
  });
}
function updateTeam(route, value) {
  return firebase
    .database()
    .ref(route)
    .set(value);
}
function getTeamMatches(teamId) {
  return new Promise((resolve, reject) => {
    return firebase
      .database()
      .ref(`${'teams'}/${teamId}/${'matches'}`)
      .once('value', snapshot => {
        const matches = snapshot.toJSON();

        return resolve(matches || []);
      });
    resolve([]);
  });
}
async function addMatchToTeam(teamId, matchId) {
  const matches = await getTeamMatches(teamId);
  firebase
    .database()
    .ref(`${'teams'}/${teamId}/${'matches'}/${Object.keys(matches).length || 0}`)
    .set(matchId);
}
function getTeamById(teamId) {
  const withoutMatches = arguments[1] == 'withoutTeamMatches';
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`${'teams'}/${teamId}`)
      .once('value', async snapshot => {
        const team = snapshot.toJSON();
        const teamObj = { players: {}, matches: [] };
        teamObj.id = team.id;
        teamObj.name = team.name;
        teamObj.records = team.records;

        for (const index in team.playersId) {
          teamObj.players[index] = await usersService.getUserById(team.playersId[index]);
        }

        if (!withoutMatches) {
          for (const index in team.matches) {
            const match = await matchesService.getMatchById(team.matches[index], teamId);
            teamObj.matches.push(match);
          }
        }
        resolve(teamObj);
      });
  });
}
