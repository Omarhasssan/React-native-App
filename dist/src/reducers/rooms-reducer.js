Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{rooms:[],createdRoom:{},joinedRoom:{}};var action=arguments[1];switch(action.type){case'ADD_ROOM':return _extends({},state,{rooms:[].concat(_toConsumableArray(state.rooms),[action.room])});case'ROOMS':return _extends({},state,{rooms:action.rooms});case'UPDATE_ROOMS':return _extends({},state,{rooms:updateRoom(state.rooms,action.room.id,action.room.updatedRoom)});case'UPDATE_JOINED_ROOM':return _extends({},state,{joinedRoom:action.room.id==state.joinedRoom.id?action.room.updatedRoom:state.joinedRoom});case'UPDATE_CREATED_ROOM':return _extends({},state,{createdRoom:action.room.id==state.createdRoom.id?action.room.updatedRoom:state.createdRoom});case'SET_CREATED_ROOM':return _extends({},state,{createdRoom:action.room});case'SET_JOINED_ROOM':return _extends({},state,{joinedRoom:action.room});default:return state;}};function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function updateRoom(rooms,roomId,updatedRoom){return rooms.map(function(room){return room.id===roomId?updatedRoom:room;});}function getRoomById(rooms,roomId){return rooms.filter(function(room){return room.id===roomId;})[0];}