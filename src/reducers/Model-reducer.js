export default function(
  state = {
    showObserver: false,
    showTeamRecords: { show: false, teamRecords: {} },
  },
  action
) {
  switch (action.type) {
    case 'SHOW_OBSERVER_MODEL':
      return { ...state, showObserver: true };
    case 'SHOW_TEAMDETAILS_MODEL':
      return {
        ...state,
        showTeamRecords: { show: true, teamRecords: action.teamRecords },
      };

    case 'HIDE_OBSERVER_MODEL':
      return { ...state, showObserver: false };
    case 'HIDE_TEAMDETAILS_MODEL':
      return {
        ...state,
        showTeamRecords: { ...state.showTeamRecords, show: false },
      };
    default:
      return state;
  }
}
