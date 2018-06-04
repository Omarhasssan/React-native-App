Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/containers/AddPlayers.js';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactNative=require('react-native');var _reactRedux=require('react-redux');var _withSearchContainer=require('../hocs/withSearchContainer');var _withSearchContainer2=_interopRequireDefault(_withSearchContainer);var _actions=require('../actions');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var mapStateToProps=function mapStateToProps(_ref){var players=_ref.players,checkedItems=_ref.checkedItems;return{players:players,checkedItems:checkedItems};};var mapDispatchToProps=function mapDispatchToProps(dispatch){return{onGetPlayers:function onGetPlayers(){dispatch((0,_actions.getPlayers)());},onSetTeamPlayers:function onSetTeamPlayers(playersId){console.log('pId',playersId);dispatch((0,_actions.setTeamPlayers)(playersId));},addCheckedItem:function addCheckedItem(key){dispatch((0,_actions.addCheckedItem)(key));},removeCheckedItem:function removeCheckedItem(key){dispatch((0,_actions.removeCheckedItem)(key));},clearCheckedItems:function clearCheckedItems(){dispatch((0,_actions.clearCheckedItems)());}};};var renderHeaderRight=function renderHeaderRight(){var playersId=arguments.length>0&&arguments[0]!==undefined?arguments[0]:[];var navigation=arguments[1];var onSetTeamPlayers=arguments[2];return _react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){onSetTeamPlayers(playersId);navigation.navigate('CreateTeamStepTwo');},__source:{fileName:_jsxFileName,lineNumber:37}},_react2.default.createElement(_reactNative.Text,{__source:{fileName:_jsxFileName,lineNumber:43}},'Next'));};exports.default=(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps)((0,_withSearchContainer2.default)(function(_ref2){var onGetPlayers=_ref2.onGetPlayers;return onGetPlayers();},function(_ref3){var players=_ref3.players;return players;},function(checkedPlayers,navigation,_ref4){var onSetTeamPlayers=_ref4.onSetTeamPlayers;return renderHeaderRight(checkedPlayers,navigation,onSetTeamPlayers);},function(){return[];},function(){return[];},{singleCheck:false}));