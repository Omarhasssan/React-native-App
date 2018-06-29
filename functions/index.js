/*eslint-disable */
require('babel-polyfill');
const roomsService = require('./dist/server/Service').roomsService;
const usersService = require('./dist/server/Service').usersService;
const teamsService = require('./dist/server/Service').teamsService;
const requestsService = require('./dist/server/Service').requestsService;
const notificationsService = require('./dist/server/Service')
  .notificationsService;
const observingMatchesService = require('./dist/server/Service')
  .observingMatchesService;
const handleNotificationRoute = require('./dist/server/helpers')
  .handleNotificationRoute;
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const config = functions.config();

admin.initializeApp(config.firebase);
var express = require('express');

const app = express();

function updateTeamRecordDB(teamId, records) {
  teamsService.updateTeam(`teams/${teamId}/records`, records);
}

app.post('/sendNotification', (req, res) => {
  const { userId, notificationType, updatedNotifications } = req.body;
  io.sockets.in(userId).emit('joiningTeamNotification', 'alo');
  notificationsService.updateNotifications(
    `Notifications/${userId}`,
    updatedNotifications
  );
  res.send(200);
});

app.post('/submitMatchObservation', (req, res) => {
  /*
  * forevery player in two teams update his goals in db and increment gamesPlayed BY one
  * update team win,lose,draw,gamePlayed,numOfGoals *both teams*
  * delete from matchesToObserve
  */
  const { matchDetails } = req.body;
  const { firstTeam } = matchDetails;
  // = {goals:,playersGoals:{0:{id:gfgf,goals:5},1:{id:gfgf,goals:5}}}
  const { secondTeam } = matchDetails;
  // combine both team players in one array to iterate over them
  let allPlayers = [];
  allPlayers.push(...Object.values(firstTeam.playersGoals));
  allPlayers.push(...Object.values(secondTeam.playersGoals));
  allPlayers.map(playerDetails => {
    usersService.getUserById(playerDetails.id).then(data => {
      const player = data.toJSON();
      const playerGoals =
        parseInt(player.records.goals) + parseInt(playerDetails.goals);

      const playerGamesPlayed = parseInt(player.records.gamesPlayed) + 1;
      const playerRecords = {
        goals: playerGoals,
        gamesPlayed: playerGamesPlayed
      };
      usersService.updateUser(
        `users/${playerDetails.id}/records`,
        playerRecords
      );
    });
  });
  // for teams
  let fTeam, fTeamGoals, fTeamGamesPlayed, firstTeamRecords;
  teamsService
    .getTeamById(firstTeam.id)
    .then(() => {
      fTeam = data.toJSON();
      fTeamGoals = parseInt(fTeam.records.goals) + parseInt(firstTeam.goals);
      fTeamGamesPlayed = fTeam.records.gamesPlayed + 1;
      firstTeamRecords = {};
      Object.assign(firstTeamRecords, fTeam.records);
      firstTeamRecords.goals = fTeamGoals;
      firstTeamRecords.gamesPlayed = fTeamGamesPlayed;
      return Promise.resolve();
    })
    .then(() => {
      teamsService.getTeamById(secondTeam.id).then(data2 => {
        const sTeam = data2.toJSON();
        const sTeamGoals =
          parseInt(sTeam.records.goals) + parseInt(secondTeam.goals);

        const sTeamGamesPlayed = sTeam.records.gamesPlayed + 1;

        let secondTeamRecords = {};
        Object.assign(secondTeamRecords, sTeam.records);
        secondTeamRecords.goals = sTeamGoals;
        secondTeamRecords.gamesPlayed = sTeamGamesPlayed;

        if (firstTeam.goals > secondTeam.goals) {
          firstTeamRecords.wins = fTeam.records.wins + 1;
          secondTeamRecords.wins = sTeam.records.loses + 1;
          updateTeamRecordDB(firstTeam.id, firstTeamRecords);
          updateTeamRecordDB(secondTeam.id, secondTeamRecords);
        } else if (firstTeam.goals < secondTeam.goals) {
          firstTeamRecords.wins = fTeam.records.loses + 1;
          secondTeamRecords.wins = sTeam.records.wins + 1;
          updateTeamRecordDB(firstTeam.id, firstTeamRecords);
          updateTeamRecordDB(secondTeam.id, secondTeamRecords);
        } else {
          firstTeamRecords.wins = fTeam.records.draws + 1;
          secondTeamRecords.wins = sTeam.records.draws + 1;
          updateTeamRecordDB(firstTeam.id, firstTeamRecords);
          updateTeamRecordDB(secondTeam.id, secondTeamRecords);
        }
      });
    });
});
app.post('/acceptObservingRoom', (req, res) => {
  /*
  * change status in observing request table to accept giving requestId
  * update roomobserver status in room to accept giving roomId
  * update room Object
  */
  console.log('hi hi hi hi');
  // const request = req.body;
  // const room = request.room;

  // requestsService.updateRequest(request.id, 'observing');
  // roomsService.updateRoom(
  //   `Rooms/${room.id}/settings/observer/status`,
  //   'ACCEPTED'
  // );

  // const observingRoom = {
  //   roomId: room.id,
  //   observerId: room.settings.observer.info.id
  // };
  // observingMatchesService.addObservingMatch(observingRoom);
  res.send(200);
});
exports.req = functions.https.onRequest(app);

/*
* trigger function for teamReqeusts table 'status'
* whenever status turned to 'accepted'
* 1- add this playerId to target team in teams table
* 2- add teamId to target user in users table
*/
exports.addUserToTeam = functions.database
  .ref('/TeamRequests/{reqId}/status')
  .onUpdate(event => {
    const db = admin.database();
    return event.before.ref.parent.once('value', req => {
      const playerId = req.val().playerId;
      const teamId = req.val().teamId;

      return db
        .ref(`${'teams'}/${teamId}/${'playersId'}`)
        .once('value', snapshot => {
          let players = snapshot.toJSON() || {};
          const sz = Object.keys(players).length;
          players[sz] = playerId;
          db.ref(`${'teams'}/${teamId}/${'playersId'}`).set(players);
          db.ref(`${'users'}/${playerId}/${'teamId'}`).set(teamId);
        });
    });
  });
/*
* trigger function for observerRequest
* whenever status turned to 'accepted'
* 1-update status to AC to his observing Room giving roomId
*/
exports.onChangingObservingStatus = functions.database
  .ref('/ObservingRequests/{reqId}/status')
  .onUpdate(event => {
    const roomId = event.after.val().roomId;

    const reqStatus = event.after.val().status;
    return admin
      .database()
      .ref(`${'Rooms'}/${roomId}/${'settings'}/${'observer'}/${'status'}`)
      .set(reqStatus);
  });

