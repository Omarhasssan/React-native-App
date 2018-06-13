import { combineReducers } from 'redux'; // 3.7.2
import auth from './auth-reducer';
import nav from './nav-reducer';
import players from './global-reducer';
import userInvitations from './userRequests-reducer';
import team from './team-reducer';
import teamsReducer from './teams-reducer';
import socket from './socket-reducer';
import roomsReducer from './rooms-reducer';
import model from './Model-reducer';
import checkedItems from './checkedItems-reducer';
import observingMatches from './observingMatches-reducer';
import teamRecords from './teamDetails-reducer';
import notifications from './notifications-reducer';

const rootReducer = combineReducers({
  auth,
  nav,
  players,
  userInvitations,
  team,
  socket,
  teamsReducer,
  roomsReducer,
  model,
  checkedItems,
  observingMatches,
  teamRecords,
  notifications,
});

export default rootReducer;
