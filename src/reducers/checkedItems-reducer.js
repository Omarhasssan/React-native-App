let arr = [];
export default function (state = [], action) {
  switch (action.type) {
    case 'ADD_CHECKED_ITEM':
      // arr = state;
      // arr[action.key] = true;
      return { ...state, [action.key]: true };
    case 'REMOVE_CHECKED_ITEM': {
      arr = [];
      for (const k in state) if (k != action.key) arr[k] = true;
      return Object.assign([], arr);
    }
    case 'LOAD_CHECKED_ITEMS':
      return Object.assign([], action.checkedItems);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}
