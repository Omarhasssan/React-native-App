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
      console.log('LOAD_DATA_SUCCESS');
      return false;
    case 'LOAD_DATA_SUCCESS':
      console.log('LOAD_DATA_SUCCESS');
      return true;
    default:
      return state;
  }
};
