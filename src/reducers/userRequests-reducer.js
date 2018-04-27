export default function (state = [], action) {
  switch (action.type) {
    case 'ADD_REQUEST':
      // console.log('in request reducer', action.Request);
      return [...state, action.request];
    case 'USER_REQUESTS':
      return [...action.userReqs];
    case 'ACCEPT_REQUEST':
    case 'REJECT_REQUEST':
      if (state.length === 1 && state[0].id === action.requestId) return [];
      return state.map((request) => {
        if (request.id !== action.requestId) {
          return request;
        }
      });
    default:
      return state;
  }
}
