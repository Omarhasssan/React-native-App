import { combineReducers } from 'redux'; // 3.7.2
import auth from './auth-reducer';
import nav from './nav-reducer';

const rootReducer = combineReducers({
  auth,
  nav,
});

export default rootReducer;
