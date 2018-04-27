import { DBHelpers } from '../helpers';
/*eslint-disable */

export const updateUserRoleToCaptain = user => {
  DBHelpers.updateUser(`users/${user.id}/role`, 'CAPTAIN');
  return {
    type: 'UPDATE_CURRENT_USER',
    payload: { type: 'role', value: 'CAPTAIN' },
  };
};

export const updateUserTeam = (user, team) => dispatch => {
  DBHelpers.updateUser(`users/${user.id}/teamId`, team.id);
  dispatch({
    type: 'UPDATE_CURRENT_USER',
    payload: { type: 'team', value: team },
  });
};
export const updateUserRoom = (user, room) => {
  DBHelpers.updateUser(`users/${user.id}/roomId`, room.id);
  return {
    type: 'UPDATE_CURRENT_USER',
    payload: { type: 'room', value: room },
  };
};

export const getPlayers = () => dispatch =>
  DBHelpers.getUsers().then(users => {
    dispatch({
      type: 'GET_USERS',
      users,
    });
  });
