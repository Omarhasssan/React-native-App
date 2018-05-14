export default function (state = [], action) {
  switch (action.type) {
    case 'SET_OBSERVING_MATCH':
      return [...state, action.match];
    default:
      return state;
  }
}
