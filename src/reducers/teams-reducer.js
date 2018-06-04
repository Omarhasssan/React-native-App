function sortMatchesByDate(matches) {
  matches.sort((match1, match2) => {
    if (match1.date.year != match2.date.year) return match1.date.year - match2.date.year;
    if (match1.date.month != match2.date.month) return match1.date.month - match2.date.month;
    if (match1.date.day != match2.date.day) return match1.date.day - match2.date.day;
    if (match1.date.time != match2.date.time) {
      if (match1.date.time.hours != match2.date.time.hours) {
        return match1.date.time.hours - match2.date.time.hours;
      }
      if (match1.date.time.minutes != match2.date.time.minutes) {
        return match1.date.time.minutes - match2.date.time.minutes;
      }
    }
  });
  return matches;
}
function addMatch(teams, teamId, updatedMatches) {
  const x = teams.map((team) => {
    if (team.id === teamId) {
      const updatedTeam = team;
      updatedTeam.matches = updatedMatches;
      updatedTeam.matches = sortMatchesByDate(team.matches);
      return updatedTeam.matches;
    }
  });
  return x;
}
function updateTeamPlayers(teams, teamId, player) {
  return teams.map((team) => {
    if (team.id === teamId) {
      return { ...team, players: { ...team.players, [team.players.length]: player } };
    }
    return team;
  });
}
function updatePlayer(teams, teamId, userId, type, value) {
  const x = teams.map((team) => {
    if (team.id == teamId) {
      team.players = Object.keys(team.players).map((playerId) => {
        if (team.players[playerId].id == userId) {
          return { [playerId]: { ...team.players[playerId], [type]: value } };
        }
        return { [playerId]: { ...team.players[playerId] } };
      })[0];
      return team;
    }
    return team;
  });
  // console.log('x', x);
  return x;
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
            ? {
              ...state.curntTeam,
              players: {
                ...state.curntTeam.players,
                [state.curntTeam.players.length]: action.payload.player,
              },
            }
            : state.curntTeam,
      };
    case 'UPDATE_PLAYER':
      return {
        ...state,
        teams: updatePlayer(
          state.teams,
          action.payload.teamId,
          action.payload.userId,
          action.payload.type,
          action.payload.value,
        ),
        curntTeam: {
          ...state.curntTeam,
          ...updatePlayer(
            [state.curntTeam],
            action.payload.teamId,
            action.payload.userId,
            action.payload.type,
            action.payload.value,
          )[0],
        },
      };
    case 'SET_TEAM_MATCHES':
      return {
        ...state,
        teams: [],
        curntTeam:
          action.payload.teamId === state.curntTeam.id
            ? {
              ...state.curntTeam,
              matches: addMatch(
                [state.curntTeam],
                action.payload.teamId,
                action.payload.updatedMatches,
              )[0],
            }
            : state.curntTeam,
      };
    case 'SET_CURNT_TEAM':
      return { ...state, curntTeam: action.team };
    default:
      return state;
  }
}
