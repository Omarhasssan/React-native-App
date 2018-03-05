import { DBHelpers } from '../helpers';
/*eslint-disable */

export const addTeam = (user, teamInfo) => dispatch => {
  let teamId = DBHelpers.addTeam(teamInfo);
  let updateUser = { ...user, teamId: teamId };
  DBHelpers.updateUser(user.id, updateUser);
  return dispatch({
    type: 'UPDATE_CURRENT_USER',
    user: updateUser,
  });
};
