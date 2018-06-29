import { teamsService, usersService } from '../Service';
/*eslint-disable */

export const getJoinedTeam = () => dispatch => {};
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
