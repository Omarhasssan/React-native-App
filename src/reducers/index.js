import { combineReducers } from 'redux'; // 3.7.2
import auth from './auth-reducer';
import nav from './nav-reducer';
import players from './global-reducer';
import userInvitations from './userRequests-reducer';
import team from './team-reducer';
import socket from './socket-reducer';

const rootReducer = combineReducers({
  auth,
  nav,
  players,
  userInvitations,
  team,
  socket,
});

export default rootReducer;
