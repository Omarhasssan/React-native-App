export const Users = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.users;

    default:
      return state;
  }
};
export const dataLoaded = (state = false, action) => {
  switch (action.type) {
    case 'LOAD_DATA_PENDING':
      return false;
    case 'LOAD_DATA_SUCCESS':
      return true;
    default:
      return state;
  }
};
export const observerLoading = (state = false, action) => {
  switch (action.type) {
    case 'LOAD_OBSERVER_INFO_PENDING':
      return true;
    case 'LOAD_OBSERVER_INFO_SUCCESS':
      return false;
    default:
      return state;
  }
};
