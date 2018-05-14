import { combineReducers } from 'redux'; // 3.7.2
import auth from './auth-reducer';
import nav from './nav-reducer';
import players from './global-reducer';
import userInvitations from './userRequests-reducer';
import team from './team-reducer';
import teamsReducer from './teams-reducer';
import socket from './socket-reducer';
import roomsReducer from './rooms-reducer';
import showObserverModel from './observerModel-reducer';
import checkedItems from './checkedItems-reducer';
import observingMatches from './observingMatches-reducer';

const rootReducer = combineReducers({
  auth,
  nav,
  players,
  userInvitations,
  team,
  socket,
  teamsReducer,
  roomsReducer,
  showObserverModel,
  checkedItems,
  observingMatches,
});

export default rootReducer;
