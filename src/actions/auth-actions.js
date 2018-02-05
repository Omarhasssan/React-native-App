import firebase from '../config/firebase';
import { DBHelpers } from '../helpers';

export const saveUser = user => (dispatch) => {
  dispatch({ type: 'SIGNUP_REQUEST' });
  return DBHelpers.saveUser(user)
    .then((user) => {
      dispatch({
        type: 'SIGNUP_SUCCESS',
        user,
      });
    })
    .catch((err) => {
      dispatch({ type: 'SIGNUP_FAILURE', err });
    });
};
