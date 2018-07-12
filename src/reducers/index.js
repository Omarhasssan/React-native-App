import { combineReducers } from 'redux'; // 3.7.2
import auth from './auth-reducer';
import nav from './nav-reducer';
import { Users, dataLoaded, observerLoading } from './global-reducer';
import userInvitations from './userRequests-reducer';
import team from './team-reducer';
import teamsReducer from './teams-reducer';
import socket from './socket-reducer';
import roomsReducer from './rooms-reducer';
import model from './Model-reducer';
import checkedItems from './checkedItems-reducer';
import observingMatches from './observingMatches-reducer';
import notifications from './notifications-reducer';
import notificationHandler from './notificationHandler-reducer';

const rootReducer = combineReducers({
  auth,
  nav,
  players: Users,
  dataLoaded: dataLoaded,
  observerLoading: observerLoading,
  userInvitations,
  team,
  socket,
  teamsReducer,
  roomsReducer,
  model,
  checkedItems,
  observingMatches,
  notifications,
  notificationHandler,
});

export default rootReducer;
