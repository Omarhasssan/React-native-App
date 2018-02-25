import { DBHelpers } from '../helpers';

export const getPlayers = () => dispatch =>
  DBHelpers.getUsers().then((users) => {
    dispatch({
      type: 'GET_USERS',
      users,
    });
  });
