Object.defineProperty(exports,"__esModule",{value:true});var _firebase=require('firebase');var firebase=_interopRequireWildcard(_firebase);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}var config={apiKey:'AIzaSyDmtFVifEoAn8t3KtqThIHX3RlH6CrWO4U',authDomain:'squad-builder.firebaseapp.com',databaseURL:'https://squad-builder.firebaseio.com',projectId:'squad-builder',storageBucket:'squad-builder.appspot.com',messagingSenderId:'411287222096'};firebase.initializeApp(config);exports.default=firebase;