export default function (state = false, action) {
  switch (action.type) {
    case 'SHOW_MODEL':
      return true;
    case 'HIDE_MODEL':
      return false;
    default:
      return state;
  }
}
