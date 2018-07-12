export const showObserverModel = () => dispatch => {
  dispatch({ type: 'SHOW_OBSERVER_MODEL' });
};
export const hideObserverModel = () => dispatch => {
  dispatch({ type: 'HIDE_OBSERVER_MODEL' });
};
export const showTeamDetailsModel = teamRecords => dispatch => {
  dispatch({ type: 'SHOW_TEAMDETAILS_MODEL', teamRecords: teamRecords });
};
export const hideTeamDetailsModel = () => dispatch => {
  dispatch({ type: 'HIDE_TEAMDETAILS_MODEL' });
};
