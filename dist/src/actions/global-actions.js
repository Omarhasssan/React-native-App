Object.defineProperty(exports,"__esModule",{value:true});exports.setOpenedTeamDetails=exports.setObserver=exports.loadCheckedItems=exports.clearCheckedItems=exports.removeCheckedItem=exports.addCheckedItem=exports.getJoinedTeam=undefined;var _helpers=require('../helpers');var getJoinedTeam=exports.getJoinedTeam=function getJoinedTeam(socket){return function(dispatch){socket.on('userJoined',function(teamId){console.log(teamId,'joind room');_helpers.DBHelpers.getTeamById(teamId).then(function(team){return dispatch({type:'JOINED_TEAM',team:team});});});};};var addCheckedItem=exports.addCheckedItem=function addCheckedItem(key){return function(dispatch){dispatch({type:'ADD_CHECKED_ITEM',key:key});};};var removeCheckedItem=exports.removeCheckedItem=function removeCheckedItem(key){return function(dispatch){dispatch({type:'REMOVE_CHECKED_ITEM',key:key});};};var clearCheckedItems=exports.clearCheckedItems=function clearCheckedItems(){return function(dispatch){dispatch({type:'CLEAR'});};};var loadCheckedItems=exports.loadCheckedItems=function loadCheckedItems(checkedItems){return function(dispatch){dispatch({type:'LOAD_CHECKED_ITEMS',checkedItems:checkedItems});};};var setObserver=exports.setObserver=function setObserver(observerId){return function(dispatch){_helpers.DBHelpers.getUserById(observerId).then(function(observer){return dispatch({type:'SET_OBSERVER',observer:observer});});};};var setOpenedTeamDetails=exports.setOpenedTeamDetails=function setOpenedTeamDetails(teamRecords){return function(dispatch){dispatch({type:'SET_CURNT_TEAM_DETAILS',teamRecords:teamRecords});};};