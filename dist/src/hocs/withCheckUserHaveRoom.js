Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='src/hocs/withCheckUserHaveRoom.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactNative=require('react-native');var _Room=require('../containers/Room');var _Room2=_interopRequireDefault(_Room);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}exports.default=withCheckUserHaveRoom=function withCheckUserHaveRoom(WrappedComponent){return function(_Component){_inherits(_class,_Component);function _class(){_classCallCheck(this,_class);return _possibleConstructorReturn(this,(_class.__proto__||Object.getPrototypeOf(_class)).apply(this,arguments));}_createClass(_class,[{key:'componentWillMount',value:function componentWillMount(){var user=this.props.screenProps.user;this.props.navigation.setParams({roomId:user.roomId});}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(nextProps){var user=nextProps.screenProps.user;if(this.props.navigation.state.params&&user.roomId!=this.props.navigation.state.params.roomId){this.props.navigation.setParams({roomId:user.roomId});}}},{key:'render',value:function render(){var room=this.props.screenProps.room;if(!room.id)return _react2.default.createElement(WrappedComponent,_extends({},this.props,{__source:{fileName:_jsxFileName,lineNumber:35}}));return _react2.default.createElement(_Room2.default,{stackNavigation:this.props.screenProps.stackNavigation,room:room,__source:{fileName:_jsxFileName,lineNumber:36}});}}],[{key:'navigationOptions',value:function navigationOptions(_ref){var navigation=_ref.navigation;if(navigation.state.params&&navigation.state.params.roomId){return{tabBarLabel:'Your Room'};}}}]);return _class;}(_react.Component);};