Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/components/Item.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactNativeElements=require('react-native-elements');var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Item=function(_Component){_inherits(Item,_Component);function Item(){var _ref;var _temp,_this,_ret;_classCallCheck(this,Item);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=Item.__proto__||Object.getPrototypeOf(Item)).call.apply(_ref,[this].concat(args))),_this),_this.state={checked:false},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(Item,[{key:'shouldComponentUpdate',value:function shouldComponentUpdate(nextProps,nextState){return nextProps.itemIsChecked!=this.state.checked||this.props.item!=nextProps.item||this.state!=nextState;}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(nextProps){if(nextProps.itemIsChecked!=this.state.checked)this.setState({checked:nextProps.itemIsChecked});}},{key:'render',value:function render(){var _this2=this;var _props=this.props,item=_props.item,onCheck=_props.onCheck,itemIsChecked=_props.itemIsChecked;var checked=this.state.checked;return _react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){_this2.setState({checked:!checked},function(){return onCheck(item.id,!checked);});},key:item.id,style:styles.itemContainer,__source:{fileName:_jsxFileName,lineNumber:35}},_react2.default.createElement(_reactNative.Image,{style:styles.userImg,source:item.imgUri&&{uri:item.imgUri}||require('../imges/user.png'),__source:{fileName:_jsxFileName,lineNumber:42}}),_react2.default.createElement(_reactNative.Text,{style:{flex:1,alignSelf:'center'},__source:{fileName:_jsxFileName,lineNumber:46}},item.name),_react2.default.createElement(_reactNativeElements.CheckBox,{checked:checked,containerStyle:{backgroundColor:'transparent',width:0,borderWidth:0},__source:{fileName:_jsxFileName,lineNumber:47}}));}}]);return Item;}(_react.Component);var styles=_reactNative.StyleSheet.create({itemContainer:{flex:1,flexDirection:'row',justifyContent:'center',borderBottomWidth:1,borderColor:'#e0e0e0',paddingLeft:5,paddingRight:5},userImg:{alignSelf:'center',marginRight:7,borderColor:'#D9D9D9',width:40,height:40,borderRadius:20,borderWidth:1}});exports.default=Item;