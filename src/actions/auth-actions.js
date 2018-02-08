import firebase from '../config/firebase';
import { DBHelpers } from '../helpers';

export const Register = user => (dispatch) => {
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

export const Login = user => (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  return DBHelpers.findUser(user)
    .then((user) => {
      dispatch({
        type: 'LOGIN_SUCCESS',
        user,
      });
    })
    .catch(() => {
      dispatch({ type: 'LOGIN_FAILURE', err: 'username or password incorret' });
    });
};
export const clearError = () => (dispatch) => {
  dispatch({ type: 'CLEAR_ERROR' });
};
