Object.defineProperty(exports,"__esModule",{value:true});exports.default=undefined;var _jsxFileName='src/containers/CheckBox.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactNative=require('react-native');var _reactNativeElements=require('react-native-elements');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var MyCheckBox=function(_Component){_inherits(MyCheckBox,_Component);function MyCheckBox(){var _ref;var _temp,_this,_ret;_classCallCheck(this,MyCheckBox);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=MyCheckBox.__proto__||Object.getPrototypeOf(MyCheckBox)).call.apply(_ref,[this].concat(args))),_this),_this.state={checked:false},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(MyCheckBox,[{key:'render',value:function render(){var _this2=this;var _props=this.props,txt=_props.txt,setChecked=_props.setChecked;var checked=this.state.checked;return _react2.default.createElement(_reactNative.View,{onPress:function onPress(){_this2.setState({checked:!checked});setChecked(!checked);},style:{height:20,flexDirection:'row',alignItems:'center'},__source:{fileName:_jsxFileName,lineNumber:21}},_react2.default.createElement(_reactNative.Text,{__source:{fileName:_jsxFileName,lineNumber:28}},txt),_react2.default.createElement(_reactNativeElements.CheckBox,{checked:checked,containerStyle:{backgroundColor:'transparent',width:0,borderWidth:0},__source:{fileName:_jsxFileName,lineNumber:29}}));}}]);return MyCheckBox;}(_react.Component);exports.default=MyCheckBox;