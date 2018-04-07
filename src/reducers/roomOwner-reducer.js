export default function (state = {}, action) {
  switch (action.type) {
    case 'SET_ROOM_OWNER':
      return action.team;
    default:
      return state;
  }
}
