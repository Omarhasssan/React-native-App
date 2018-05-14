let arr = [];
export default function (state = { loaded: false, items: [] }, action) {
  switch (action.type) {
    case 'ADD_CHECKED_ITEM':
      // arr = state;
      // arr[action.key] = true;
      return { loaded: false, items: { ...state.items, [action.key]: true } };
    case 'REMOVE_CHECKED_ITEM': {
      arr = [];
      for (const k in state.items) if (k != action.key) arr[k] = true;
      return { loaded: false, items: arr };
    }
    case 'LOAD_CHECKED_ITEMS':
      return { loaded: true, items: action.checkedItems };
    case 'CLEAR':
      return {};
    default:
      return state;
  }
}
