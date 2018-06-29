Object.defineProperty(exports,"__esModule",{value:true});exports.teamRequestsService=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _firebase=require('../config/firebase');var _firebase2=_interopRequireDefault(_firebase);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var _=require('lodash');var teamRequestsService=exports.teamRequestsService={getRequestById:getRequestById,getRequestByteamId:getRequestByteamId,addTeamRequest:addTeamRequest,onRequestStatusChanged:onRequestStatusChanged};function getRequestByteamId(teamId){var arr=[];return new Promise(function(resolve,reject){return _firebase2.default.database().ref('TeamRequests').on('value',function(snapshot){var reqs=snapshot.toJSON();for(i in reqs){if(reqs[i].teamId==teamId)arr.push(reqs[i]);}return resolve(arr);});});}function getRequestById(requestId){return new Promise(function(resolve,reject){return _firebase2.default.database().ref('TeamRequests'+'/'+requestId).on('value',function(snapshot){return resolve(snapshot.toJSON());});});}function addTeamRequest(Request){var req=_extends({},Request);var requestsRef=_firebase2.default.database().ref('TeamRequests').push();req.id=requestsRef.key;return requestsRef.set(req).then(function(){return Promise.resolve(req.id);});}function onRequestStatusChanged(){return new Promise(function(resolve,reject){_firebase2.default.database().ref('TeamRequests').on('child_changed',function(data){var req=data.toJSON();if(req.status=='ACCEPTED'){resolve(req);}});});}