export default function (state = { name: '', players: [] }, action) {
  switch (action.type) {
    case 'SET_TEAM_NAME':
      return { ...state, name: action.teamName };
    case 'SET_TEAM_PLAYERS':
      return { ...state, players: action.teamPlayers };

    default:
      return state;
  }
}
