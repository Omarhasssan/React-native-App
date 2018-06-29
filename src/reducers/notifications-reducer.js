const intialState = {
  invitations: {
    total: 0,
    observing: 0,
    joiningTeam: 0,
  },
  team: { total: 0, nextMatches: 0 },
};
export default function (state = intialState, action) {
  switch (action.type) {
    case 'ADD_OBSERVING_NOTIFICATION':
      return {
        ...state,
        invitations: {
          ...state.invitations,
          observing: state.invitations.observing + 1,
          total: state.invitations.total + 1,
        },
      };
    case 'ADD_JOININGTEAM_NOTIFICATION':
      return {
        ...state,
        invitations: {
          ...state.invitations,
          joiningTeam: state.invitations.joiningTeam + 1,
          total: state.invitations.total + 1,
        },
      };
    case 'LOAD_USER_NOTIFICATIONS':
      return {
        ...state,
        ...action.notifications,
      };
    case 'REMOVE_OBSERVING_NOTIFICATIONS':
      return {
        ...state,
        invitations: {
          ...state.invitations,
          total: state.invitations.total - state.invitations.joiningTeam,
          joiningTeam: 0,
        },
      };
    case 'REMOVE_JOININGTEAM_NOTIFICATIONS':
      return {
        ...state,
        invitations: {
          ...state.invitations,
          total: state.invitations.total - state.invitations.observing,
          observing: 0,
        },
      };
    default:
      return state;
  }
}
