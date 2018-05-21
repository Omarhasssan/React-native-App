require('babel-polyfill');

var express = require('express');

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const config = functions.config();

admin.initializeApp(config.firebase);

const app = express();
function setResult(teamId, result, value) {
  admin
    .database()
    .ref(`${'teams'}/${teamId}/${'records'}/${result}`)
    .set(value);
}
app.post('/tst', (req, res) => {
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
        console.log('id', playerDetails.id);
        const player = data.toJSON();
        const playerGoals =
          player.records && player.records.goals
            ? parseInt(player.records.goals) + parseInt(playerDetails.goals)
            : playerDetails.goals;

        const playerGamesPlayed =
          player.records && player.records.gamesPlayed
            ? parseInt(player.records.gamesPlayed) + 1
            : 1;
        admin
          .database()
          .ref(`${'users'}/${playerDetails.id}/${'records'}/${'goals'}`)
          .set(playerGoals);

        admin
          .database()
          .ref(`${'users'}/${player.id}/${'records'}/${'gamesPlayed'}`)
          .set(playerGamesPlayed);
      });
  });
  // for teams
  return admin
    .database()
    .ref(`${'teams'}/${firstTeam.id}`)
    .once('value', data => {
      const fTeam = data.toJSON();
      const fTeamGoals =
        fTeam.records && fTeam.records.goals
          ? parseInt(fTeam.records.goals) + parseInt(firstTeam.goals)
          : firstTeam.goals;
      const fTeamGamesPlayed =
        fTeam.records && fTeam.records.gamesPlayed
          ? fTeam.records.gamesPlayed + 1
          : 1;
      setResult(firstTeam.id, 'goals', fTeamGoals);
      setResult(firstTeam.id, 'gamesPlayed', fTeamGamesPlayed);

      return admin
        .database()
        .ref(`${'teams'}/${secondTeam.id}`)
        .once('value', data2 => {
          const sTeam = data2.toJSON();
          const sTeamGoals =
            sTeam.records && sTeam.records.goals
              ? parseInt(sTeam.records.goals) + parseInt(secondTeam.goals)
              : secondTeam.goals;
          const sTeamGamesPlayed =
            sTeam.records && sTeam.records.gamesPlayed
              ? sTeam.records.gamesPlayed + 1
              : 1;
          setResult(secondTeam.id, 'goals', sTeamGoals);
          setResult(secondTeam.id, 'gamesPlayed', sTeamGamesPlayed);

          if (firstTeam.goals > secondTeam.goals) {
            setResult(firstTeam.id, 'wins', fTeam.wins ? fTeam.wins + 1 : 1);
            setResult(
              secondTeam.id,
              'loses',
              sTeam.loses ? sTeam.loses + 1 : 1
            );
          } else if (firstTeam.goals < secondTeam.goals) {
            setResult(firstTeam.id, 'loses', fTeam.loses ? fTeam.loses + 1 : 1);
            setResult(secondTeam.id, 'wins', sTeam.wins ? sTeam.wins + 1 : 1);
          } else {
            setResult(
              secondTeam.id,
              'draws',
              sTeam.draws ? sTeam.draws + 1 : 1
            );
            setResult(firstTeam.id, 'draws', fTeam.draws ? fTeam.draws + 1 : 1);
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
