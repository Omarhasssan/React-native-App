export default function (state = { showObserver: false, showTeamDetails: false }, action) {
  switch (action.type) {
    case 'SHOW_OBSERVER_MODEL':
      return { ...state, showObserver: true };
    case 'SHOW_TEAMDETAILS_MODEL':
      return { ...state, showTeamDetails: true };

    case 'HIDE_OBSERVER_MODEL':
      return { ...state, showObserver: false };
    case 'HIDE_TEAMDETAILS_MODEL':
      return { ...state, showTeamDetails: false };
    default:
      return state;
  }
}
