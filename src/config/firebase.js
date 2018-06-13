import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDmtFVifEoAn8t3KtqThIHX3RlH6CrWO4U',
  authDomain: 'squad-builder.firebaseapp.com',
  databaseURL: 'https://squad-builder.firebaseio.com',
  projectId: 'squad-builder',
  storageBucket: 'squad-builder.appspot.com',
  messagingSenderId: '411287222096',
};
firebase.initializeApp(config);
export default firebase;
