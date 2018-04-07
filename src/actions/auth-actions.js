import { DBHelpers } from '../helpers';
import { AsyncStorage } from 'react-native';

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
  return DBHelpers.checkUserFound(user)
    .then((user) => {
      // MAKE A SOCKET ROOM FOR USER
      dispatch({
        type: 'CREATE_ROOM_BY_USER_ID',
        id: user.id,
      });
      dispatch({
        type: 'LOGIN_SUCCESS',
        user,
      });
      // join rooms-channel
      dispatch({
        type: 'JOIN_ROOMS_CHANNEL',
      });

      // should save to async storage ?
      AsyncStorage.setItem('@User', JSON.stringify(user)).then(() => console.log('user saved'));
    })
    .catch(() => {
      dispatch({ type: 'LOGIN_FAILURE', err: 'username or password incorret' });
    });
};
export const clearError = () => (dispatch) => {
  dispatch({ type: 'CLEAR_ERROR' });
};
export const checkIfWeKnowThisUserBefore = () => (dispatch) => {
  // AsyncStorage.removeItem('@User');

  AsyncStorage.getItem('@User').then((user) => {
    if (user !== null) {
      dispatch({
        type: 'CREATE_ROOM_BY_USER_ID',
        id: user.id,
      });
      dispatch({
        type: 'JOIN_ROOMS_CHANNEL',
      });
      dispatch({
        type: 'LOGIN_SUCCESS',
        user: JSON.parse(user),
      });

      // if (JSON.parse(user).roomId) {
      //   dispatch({
      //     type: 'CREATE_ROOM_BY_ROOM_ID',
      //     id: JSON.parse(user).roomId,
      //   });
      // }
    }
  });
};
