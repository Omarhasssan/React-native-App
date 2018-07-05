import { teamsService, usersService } from '../Service';
import { checkIfWeKnowThisUserBefore } from './auth-actions';
import { getRooms } from './room-actions';
import { getTeams } from './team-actions';
/*eslint-disable */

export const getJoinedTeam = socket => dispatch => {
  socket.on('userJoined', teamId => {
    console.log(teamId, 'joind room');
    teamsService
      .getTeamById(teamId)
      .then(team => dispatch({ type: 'JOINED_TEAM', team: team }));
  });
};
export const addCheckedItem = key => dispatch => {
  dispatch({ type: 'ADD_CHECKED_ITEM', key: key });
};
export const removeCheckedItem = key => dispatch => {
  dispatch({ type: 'REMOVE_CHECKED_ITEM', key: key });
};
export const clearCheckedItems = () => dispatch => {
  dispatch({ type: 'CLEAR' });
};
export const loadCheckedItems = checkedItems => dispatch => {
  dispatch({ type: 'LOAD_CHECKED_ITEMS', checkedItems: checkedItems });
};
export const setObserver = observerId => dispatch => {
  usersService
    .getUserById(observerId)
    .then(observer => dispatch({ type: 'SET_OBSERVER', observer }));
};

export const setOpenedTeamDetails = teamRecords => dispatch => {
  dispatch({
    type: 'SET_CURNT_TEAM_DETAILS',
    teamRecords,
  });
};

export const loadData = () => dispatch => {
  dispatch({
    type: 'LOAD_DATA_PENDING',
  });
  const p1 = dispatch(checkIfWeKnowThisUserBefore());
  const p2 = dispatch(getRooms());
  const p3 = dispatch(getTeams());
  Promise.all([p1, p2, p3]).then(dataLoaded => {
    console.log(
      '=>HEY MAN THE WHOLE DATA IS LOADED U CAN PLAY NOW WITH MY APP'
    );
    dispatch({
      type: 'LOAD_DATA_SUCCESS',
    });
  });
};
