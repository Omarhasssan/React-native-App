var express = require('express');

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const config = functions.config();

admin.initializeApp(config.firebase);

const app = express();

app.post('/acceptObservingRoom', (req, res) => {
  /*
  * change status in observing request table to accept giving requestId
  * update roomobserver status in room to accept giving roomId
  * update room Object
  * socket roomUpdated giving updatedRoom
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
