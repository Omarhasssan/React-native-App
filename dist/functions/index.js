var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}require('babel-polyfill');var express=require('express');var functions=require('firebase-functions');var admin=require('firebase-admin');var config=functions.config();admin.initializeApp(config.firebase);var app=express();function setResult(teamId,records){admin.database().ref('teams'+'/'+teamId+'/'+'records').set(records);}app.post('/submitMatchObservation',function(req,res){var matchDetails=req.body.matchDetails;var firstTeam=matchDetails.firstTeam;var secondTeam=matchDetails.secondTeam;var allPlayers=[];allPlayers.push.apply(allPlayers,_toConsumableArray(Object.values(firstTeam.playersGoals)));allPlayers.push.apply(allPlayers,_toConsumableArray(Object.values(secondTeam.playersGoals)));allPlayers.map(function(playerDetails){admin.database().ref('users'+'/'+playerDetails.id).once('value',function(data){var player=data.toJSON();var playerGoals=parseInt(player.records.goals)+parseInt(playerDetails.goals);var playerGamesPlayed=parseInt(player.records.gamesPlayed)+1;var playerRecords={goals:playerGoals,gamesPlayed:playerGamesPlayed};admin.database().ref('users'+'/'+playerDetails.id+'/'+'records').set(playerRecords);});});return admin.database().ref('teams'+'/'+firstTeam.id).once('value',function(data){var fTeam=data.toJSON();var fTeamGoals=parseInt(fTeam.records.goals)+parseInt(firstTeam.goals);var fTeamGamesPlayed=fTeam.records.gamesPlayed+1;var firstTeamRecords={};_extends(firstTeamRecords,fTeam.records);firstTeamRecords.goals=fTeamGoals;firstTeamRecords.gamesPlayed=fTeamGamesPlayed;return admin.database().ref('teams'+'/'+secondTeam.id).once('value',function(data2){var sTeam=data2.toJSON();var sTeamGoals=parseInt(sTeam.records.goals)+parseInt(secondTeam.goals);var sTeamGamesPlayed=sTeam.records.gamesPlayed+1;var secondTeamRecords={};_extends(secondTeamRecords,sTeam.records);secondTeamRecords.goals=sTeamGoals;secondTeamRecords.gamesPlayed=sTeamGamesPlayed;if(firstTeam.goals>secondTeam.goals){firstTeamRecords.wins=fTeam.records.wins+1;secondTeamRecords.wins=sTeam.records.loses+1;setResult(firstTeam.id,firstTeamRecords);setResult(secondTeam.id,secondTeamRecords);}else if(firstTeam.goals<secondTeam.goals){firstTeamRecords.wins=fTeam.records.loses+1;secondTeamRecords.wins=sTeam.records.wins+1;setResult(firstTeam.id,firstTeamRecords);setResult(secondTeam.id,secondTeamRecords);}else{firstTeamRecords.wins=fTeam.records.draws+1;secondTeamRecords.wins=sTeam.records.draws+1;setResult(firstTeam.id,firstTeamRecords);setResult(secondTeam.id,secondTeamRecords);}});});});app.post('/acceptObservingRoom',function(req,res){var request=req.body;var room=request.room;admin.database().ref('ObservingRequests'+'/'+request.id+'/'+'status').set('ACCEPTED');admin.database().ref('Rooms'+'/'+room.id+'/'+'settings'+'/'+'observer'+'/'+'status').set('ACCEPTED');var observingRoom={roomId:room.id,observerId:room.settings.observer.info.id};var observingRef=admin.database().ref('MatchesToObserve').push();observingRoom.id=observingRef.key;observingRef.set(observingRoom);res.send(200);});exports.req=functions.https.onRequest(app);exports.addUserToTeam=functions.database.ref('/TeamRequests/{reqId}').onUpdate(function(event){var playerId=event.before.val().playerId;var teamId=event.before.val().teamId;return admin.database().ref('teams'+'/'+teamId+'/'+'players').once('value',function(snapshot){var players=snapshot.toJSON()||{};var sz=Object.keys(players).length;players[sz]=playerId;admin.database().ref('teams'+'/'+teamId+'/'+'players').set(players);return admin.database().ref('users'+'/'+playerId+'/'+'teamId').set(teamId);});});exports.onChangingObservingStatus=functions.database.ref('/ObservingRequests/{reqId}/status').onUpdate(function(event){var roomId=event.after.val().roomId;var reqStatus=event.after.val().status;return admin.database().ref('Rooms'+'/'+roomId+'/'+'settings'+'/'+'observer'+'/'+'status').set(reqStatus);});