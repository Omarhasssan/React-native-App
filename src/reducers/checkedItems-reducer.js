let arr = [];
export default function (state = [], action) {
  switch (action.type) {
    case 'ADD_CHECKED_ITEM':
      arr = state;
      arr[action.key] = true;
      return Object.assign([], arr);
    case 'REMOVE_CHECKED_ITEM':
      return state.filter(s => s !== action.key);
    case 'LOAD_CHECKED_ITEMS':
      return Object.assign([], action.checkedItems);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}
