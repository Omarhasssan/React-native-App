export default function (state = { teamRequests: [], observingRequests: [] }, action) {
  switch (action.type) {
    case 'ADD_TEAM_REQUEST':
      return { ...state, teamRequests: [...state.teamRequests, action.request] };
    case 'ADD_OBSERVING_REQUEST':
      return { ...state, observingRequests: [...state.observingRequests, action.request] };
    case 'USER_REQUESTS':
      return action.userReqs;
    case 'ACCEPT_TEAM_REQUEST':
    case 'REJECT_TEAM_REQUEST':
      if (state.teamRequests.length === 1 && state.teamRequests[0].id === action.requestId) {
        return { ...state, teamRequests: [] };
      }
      return {
        ...state,
        teamRequests: state.teamRequests.map((request) => {
          if (request.id !== action.requestId) {
            return request;
          }
        }),
      };
    case 'ACCEPT_OBSERVING_REQUEST':
    case 'REJECT_OBSERVING_REQUEST':
      if (
        state.observingRequests.length === 1 &&
        state.observingRequests[0].id === action.requestId
      ) {
        return { ...state, observingRequests: [] };
      }
      return {
        ...state,
        observingRequests: state.observingRequests.map((request) => {
          if (request.id !== action.requestId) {
            return request;
          }
        }),
      };
    default:
      return state;
  }
}
