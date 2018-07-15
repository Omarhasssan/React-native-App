const intialState = {
  invitations: {
    total: 0,
    observing: 0,
    joiningTeam: 0,
  },
  team: { total: 0, nextMatches: 0 },
};
export default function(state = intialState, action) {
  switch (action.type) {
    case 'SET_OBSERVING_NOTIFICATION':
      return {
        ...state,
        invitations: {
          ...state.invitations,
          observing: state.invitations.observing + 1,
          total: state.invitations.total + 1,
        },
      };
    case 'SET_TEAM_NOTIFICATION':
      return {
        ...state,
        team: action.notifications,
      };

    case 'LOAD_USER_NOTIFICATIONS':
      return {
        ...state,
        ...action.notifications,
      };

    default:
      return state;
  }
}
