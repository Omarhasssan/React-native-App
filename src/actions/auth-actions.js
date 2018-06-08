import { usersService, teamsService, roomsService } from '../Service';
import { AsyncStorage } from 'react-native';

export const Register = user => (dispatch) => {
  dispatch({ type: 'SIGNUP_REQUEST' });
  const userObj = { ...user, records: { gamesPlayed: 0, goals: 0 } };
  return usersService
    .saveUser(userObj)
    .then((returnedUser) => {
      dispatch({
        type: 'SIGNUP_SUCCESS',
        returnedUser,
      });
      AsyncStorage.setItem('@UserId', returnedUser.id).then(() => console.log('user saved'));
    })
    .catch((err) => {
      dispatch({ type: 'SIGNUP_FAILURE', err });
    });
};

export const Login = user => (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  return usersService
    .checkUserFound(user)
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

      // should save to async storage ?
      AsyncStorage.setItem('@UserId', user.id).then(() => console.log('user saved'));
    })
    .catch(() => {
      dispatch({ type: 'LOGIN_FAILURE', err: 'username or password incorret' });
    });
};
export const clearError = () => (dispatch) => {
  dispatch({ type: 'CLEAR_ERROR' });
};
export const checkIfWeKnowThisUserBefore = () => (dispatch) => {
  // AsyncStorage.removeItem('@UserId');

  AsyncStorage.getItem('@UserId').then((userId) => {
    if (userId != null) {
      usersService.getUserById(userId).then(async (user) => {
        dispatch({
          type: 'CREATE_ROOM_BY_USER_ID',
          id: user.id,
        });
        if (user.teamId) {
          const team = await teamsService.getTeamById(user.teamId);
          dispatch({
            type: 'CREATE_ROOM_BY_TEAM_ID',
            id: user.teamId,
          });
          dispatch({
            type: 'SET_CURNT_TEAM',
            team,
          });
        }

        if (user.roomId) {
          const room = await roomsService.getRoomById(user.roomId);
          dispatch({
            type: 'CREATE_ROOM_BY_ROOM_ID',
            id: user.roomId,
          });
          dispatch({
            type: 'SET_CREATED_ROOM',
            room,
          });
        }
        dispatch({
          type: 'LOGIN_SUCCESS',
          user,
        });
      });
    }
  });
};
