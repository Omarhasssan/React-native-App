import { DBHelpers } from '../helpers';
/*eslint-disable */

export const updateUser = (user, type, value) => {
  const updatedUser = { ...user, [type]: value };
  DBHelpers.updateUser(user.id, updatedUser);
  return {
    type: 'UPDATE_CURRENT_USER',
    user: updatedUser,
  };
};
export const getPlayers = () => dispatch =>
  DBHelpers.getUsers().then(users => {
    dispatch({
      type: 'GET_USERS',
      users,
    });
  });
