/*eslint-disable */
import firebase from '../config/firebase';
import { matchesService, usersService } from '../Service';

const _ = require('lodash');

export const teamsService = {
  getTeams,
  addTeam,
  getTeamPlayers,
  updateTeamPlayers,
  getTeamMatches,
  addMatchToTeam,
  getTeamById,
  updateTeam,
};

async function getTeams() {
  let arr = [],
    res;
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('teams')
      .once('value', async snapshot => {
        const teams = snapshot.toJSON();
        for (indx in teams) {
          if (teams[indx].players) {
            for (i in teams[indx].players) {
              teams[indx].players[i] = await usersService.getUserById(
                teams[indx].players[i]
              );
            }
            teams[indx].players = Object.values(teams[indx].players);
          }
          arr.push(teams[indx]);
        }
        resolve(arr);
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
        if (snapshot.toJSON() != null)
          return resolve(Object.values(snapshot.toJSON()));
        return resolve([]);
      })
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
    .ref(
      `${'teams'}/${teamId}/${'matches'}/${Object.keys(matches).length || 0}`
    )
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
        if (team.players) {
          const playersPromises = Object.values(team.players).map(player =>
            usersService.getUserById(player)
          );
          var p1 = Promise.all(playersPromises).then(players => {
            players.map((player, i) => {
              teamObj.players[i] = player;
            });
          });
        }
        if (!withoutMatches) {
          const matchesPromises = Object.values(team.matches).map(match =>
            matchesService.getMatchById(match, teamId, false)
          );
          var p2 = Promise.all(matchesPromises).then(matches => {
            matches.map(match => teamObj.matches.push(match));
          });
        }
        await Promise.all([p1, p2]).then(() => {
          return resolve(teamObj);
        });
      });
  });
}
