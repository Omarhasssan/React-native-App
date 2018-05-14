import { DBHelpers } from '../helpers';
/*eslint-disable */

export const updateUserRoleToCaptain = user => {
  DBHelpers.updateUser(`users/${user.id}/role`, 'CAPTAIN');
  return {
    type: 'UPDATE_CURRENT_USER',
    payload: { type: 'role', value: 'CAPTAIN' },
  };
};
export const updateUserTeam = (userId, teamId) => dispatch => {
  DBHelpers.updateUser(`users/${userId}/teamId`, teamId);
};
export const onUserHasTeam = userId => dispatch => {
  DBHelpers.onUserHasTeam(userId).then(user => {
    dispatch({
      type: 'UPDATE_CURRENT_USER',
      payload: { type: 'teamId', value: user.team.id },
    });
    dispatch({
      type: 'SET_CURNT_TEAM',
      team: user.team,
    });
  });
};
export const onUserHasMatchesToObserve = userId => dispatch => {
  DBHelpers.onUserHasMatchesToObserve(userId).then(match => {
    dispatch({
      type: 'SET_OBSERVING_MATCH',
      match,
    });
  });
};
export const updateUserRoom = (user, room) => dispatch => {
  DBHelpers.updateUser(`users/${user.id}/roomId`, room.id);
  dispatch({
    type: 'UPDATE_CURRENT_USER',
    payload: { type: 'roomId', value: room.id },
  });
  dispatch({
    type: 'SET_CREATED_ROOM',
    room: room,
  });
};

export const getPlayers = () => dispatch =>
  DBHelpers.getUsers().then(users => {
    dispatch({
      type: 'GET_USERS',
      users,
    });
  });
