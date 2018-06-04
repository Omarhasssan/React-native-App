Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactNative=require('react-native');var _reactRedux=require('react-redux');var _withSearchContainer=require('../hocs/withSearchContainer');var _withSearchContainer2=_interopRequireDefault(_withSearchContainer);var _withModel=require('../hocs/withModel');var _withModel2=_interopRequireDefault(_withModel);var _actions=require('../actions');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}var _=require('lodash');var mapStateToProps=function mapStateToProps(_ref){var players=_ref.players,checkedItems=_ref.checkedItems,roomsReducer=_ref.roomsReducer,socket=_ref.socket;return{players:players,checkedItems:checkedItems,room:roomsReducer.createdRoom,socket:socket};};var mapDispatchToProps=function mapDispatchToProps(dispatch){return{onGetPlayers:function onGetPlayers(){dispatch((0,_actions.getPlayers)());},loadCheckedItems:function loadCheckedItems(checkedItems){dispatch((0,_actions.loadCheckedItems)(checkedItems));},addCheckedItem:function addCheckedItem(key){dispatch((0,_actions.addCheckedItem)(key));},removeCheckedItem:function removeCheckedItem(key){dispatch((0,_actions.removeCheckedItem)(key));},clearCheckedItems:function clearCheckedItems(){dispatch((0,_actions.clearCheckedItems)());},setObserver:function setObserver(room,observerId,socket){dispatch((0,_actions.setRoomObserver)(room,observerId,socket));},closeModel:function closeModel(){dispatch((0,_actions.hideModel)());}};};exports.default=(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps)((0,_withSearchContainer2.default)(function(_ref2){var onGetPlayers=_ref2.onGetPlayers;return onGetPlayers();},function(_ref3){var players=_ref3.players;return players;},null,function(observerId,_ref4){var room=_ref4.room,setObserver=_ref4.setObserver,socket=_ref4.socket,closeModel=_ref4.closeModel;if(Object.keys(observerId).length>0){setObserver.apply(undefined,[room].concat(_toConsumableArray(Object.keys(observerId)),[socket]));closeModel();}else setObserver(room,null,socket);},function(_ref5){var room=_ref5.room,loadCheckedItems=_ref5.loadCheckedItems;return _.has(room,'settings')&&room.settings.observer&&room.settings.observer.info?loadCheckedItems(_extends([],_defineProperty({},room.settings.observer.info.id,true))):null;},{singleCheck:true}));