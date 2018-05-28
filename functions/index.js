require('babel-polyfill');

var express = require('express');

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const config = functions.config();

admin.initializeApp(config.firebase);

const app = express();
function setResult(teamId, records) {
  admin
    .database()
    .ref(`${'teams'}/${teamId}/${'records'}`)
    .set(records);
}
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
    admin
      .database()
      .ref(`${'users'}/${playerDetails.id}`)
      .once('value', data => {
        const player = data.toJSON();
        const playerGoals =
          parseInt(player.records.goals) + parseInt(playerDetails.goals);

        const playerGamesPlayed = parseInt(player.records.gamesPlayed) + 1;
        const playerRecords = {
          goals: playerGoals,
          gamesPlayed: playerGamesPlayed
        };
        admin
          .database()
          .ref(`${'users'}/${playerDetails.id}/${'records'}`)
          .set(playerRecords);
      });
  });
  // for teams
  return admin
    .database()
    .ref(`${'teams'}/${firstTeam.id}`)
    .once('value', data => {
      const fTeam = data.toJSON();
      const fTeamGoals =
        parseInt(fTeam.records.goals) + parseInt(firstTeam.goals);
      const fTeamGamesPlayed = fTeam.records.gamesPlayed + 1;
      let firstTeamRecords = {};
      Object.assign(firstTeamRecords, fTeam.records);
      firstTeamRecords.goals = fTeamGoals;
      firstTeamRecords.gamesPlayed = fTeamGamesPlayed;

      return admin
        .database()
        .ref(`${'teams'}/${secondTeam.id}`)
        .once('value', data2 => {
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
            setResult(firstTeam.id, firstTeamRecords);
            setResult(secondTeam.id, secondTeamRecords);
          } else if (firstTeam.goals < secondTeam.goals) {
            firstTeamRecords.wins = fTeam.records.loses + 1;
            secondTeamRecords.wins = sTeam.records.wins + 1;
            setResult(firstTeam.id, firstTeamRecords);
            setResult(secondTeam.id, secondTeamRecords);
          } else {
            firstTeamRecords.wins = fTeam.records.draws + 1;
            secondTeamRecords.wins = sTeam.records.draws + 1;
            setResult(firstTeam.id, firstTeamRecords);
            setResult(secondTeam.id, secondTeamRecords);
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
  const request = req.body;
  const room = request.room;
  admin
    .database()
    .ref(`${'ObservingRequests'}/${request.id}/${'status'}`)
    .set('ACCEPTED');
  admin
    .database()
    .ref(`${'Rooms'}/${room.id}/${'settings'}/${'observer'}/${'status'}`)
    .set('ACCEPTED');
  const observingRoom = {
    roomId: room.id,
    observerId: room.settings.observer.info.id
  };
  const observingRef = admin
    .database()
    .ref('MatchesToObserve')
    .push();
  observingRoom.id = observingRef.key;
  observingRef.set(observingRoom);
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
  .ref('/TeamRequests/{reqId}')
  .onUpdate(event => {
    // interested in playerId , teamId
    const playerId = event.before.val().playerId;
    const teamId = event.before.val().teamId;
    return admin
      .database()
      .ref(`${'teams'}/${teamId}/${'players'}`)
      .once('value', snapshot => {
        let players = snapshot.toJSON() || {};
        const sz = Object.keys(players).length;
        players[sz] = playerId;
        admin
          .database()
          .ref(`${'teams'}/${teamId}/${'players'}`)
          .set(players);
        return admin
          .database()
          .ref(`${'users'}/${playerId}/${'teamId'}`)
          .set(teamId);
      });
  });
/*
* trigger function for observerRequest
* whenever status turned to 'accepted'
* 1-update status to AC to his observing Room giving roomId 
*
*/
exports.onChangingObservingStatus = functions.database
  .ref('/ObservingRequests/{reqId}/status')
  .onUpdate(event => {
    // console.log('eBefore', event.before.val());
    // console.log('eafter', event.after.val());
    const roomId = event.after.val().roomId;

    const reqStatus = event.after.val().status;
    return admin
      .database()
      .ref(`${'Rooms'}/${roomId}/${'settings'}/${'observer'}/${'status'}`)
      .set(reqStatus);
  });
