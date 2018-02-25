import { combineReducers } from 'redux'; // 3.7.2
import auth from './auth-reducer';
import nav from './nav-reducer';
import players from './global-reducer';

const rootReducer = combineReducers({
  auth,
  nav,
  players,
});

export default rootReducer;
