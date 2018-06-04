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
    default:
      return state;
  }
}
