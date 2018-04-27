function updateTeamPlayers(teams, teamId, player) {
  return teams.map((team) => {
    if (team.id === teamId) {
      if (!team.players) {
        team = { ...team, players: [] };
      }
      team.players.push(player);
      return team;
    }
    return team;
  });
}
function getTeamById(teams, teamId) {
  return teams.filter(team => team.id === teamId)[0];
}
export default function (state = { teams: [], curntTeam: {} }, action) {
  switch (action.type) {
    case 'ADD_TEAM':
      return { ...state, teams: [...state.teams, action.team] };
    case 'TEAMS':
      return { ...state, teams: action.teams };
    case 'UPDATE_TEAM_PLAYERS':
      return {
        ...state,
        teams: updateTeamPlayers(state.teams, action.payload.teamId, action.payload.player),
        curntTeam:
          action.payload.teamId === state.curntTeam.id
            ? { ...state.curntTeam, players: [...state.curntTeam.players, action.payload.player] }
            : state.curntTeam,
      };
    case 'GET_TEAM':
      return { ...state, curntTeam: getTeamById(state.teams, action.teamId) };
    default:
      return state;
  }
}
