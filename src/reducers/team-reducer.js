export default function (state = [], action) {
  switch (action.type) {
    case 'CREATE_TEAM':
      return [...state, action.team];
    case 'UPDATE_TEAM':
      return state.map((team) => {
        if (team.teamId === action.payload.teamId) return action.payload.updatedTeam;
        return team;
      });
    default:
      return state;
  }
}
