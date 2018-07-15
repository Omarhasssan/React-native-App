import {
  usersService,
  teamsService,
  roomsService,
  notificationsService,
} from '../Service';
import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';
import { getUserRequest } from './request-actions';

export const registerForPushNotificationsAsync = userId => async dispatch => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  const token = await Notifications.getExpoPushTokenAsync();

  usersService.updateUser(`users/${userId}/notificationToken`, token);
};

export const Register = user => dispatch => {
  dispatch({ type: 'SIGNUP_REQUEST' });
  const userObj = { ...user, records: { gamesPlayed: 0, goals: 0 } };
  return usersService
    .saveUser(userObj)
    .then(returnedUser => {
      dispatch({
        type: 'SIGNUP_SUCCESS',
        returnedUser,
      });
      dispatch(registerForPushNotificationsAsync(returnedUser.id));

      AsyncStorage.setItem('@UserId', returnedUser.id);
    })
    .catch(err => {
      dispatch({ type: 'SIGNUP_FAILURE', err });
    });
};

export const getUserData = user => async (dispatch, getState) => {
  if (user.teamId) {
    var p1 = teamsService.getTeamById(user.teamId).then(team => {
      dispatch({
        type: 'CREATE_ROOM_BY_TEAM_ID',
        id: user.teamId,
      });

      dispatch({
        type: 'SET_CURNT_TEAM',
        team,
      });
    });
  }

  if (user.roomId) {
    var p2 = roomsService.getRoomById(user.roomId).then(room => {
      dispatch({
        type: 'CREATE_ROOM_BY_ROOM_ID',
        id: user.roomId,
      });
      dispatch({
        type: 'SET_CREATED_ROOM',
        room,
      });
    });
  }
  const p3 = notificationsService
    .getUserNotifications(user.id)
    .then(notifications => {
      if (notifications.val())
        dispatch({
          type: 'LOAD_USER_NOTIFICATIONS',
          notifications: notifications,
        });
    });
  const p4 = dispatch(getUserRequest(getState().socket, user));
  await Promise.all([p1, p2, p3, p4]).then(() => Promise.resolve());
};

export const Login = user => (dispatch, getState) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  return usersService
    .checkUserFound(user)
    .then(user => {
      // MAKE A SOCKET ROOM FOR USER
      dispatch({
        type: 'CREATE_ROOM_BY_USER_ID',
        id: user.id,
      });

      const userDataLoaded = dispatch(getUserData(user));
      userDataLoaded.then(() => {
        dispatch({
          type: 'LOGIN_SUCCESS',
          user,
        });
      });
    })
    .catch(() => {
      dispatch({ type: 'LOGIN_FAILURE', err: 'username or password incorret' });
    });
};
export const clearError = () => dispatch => {
  dispatch({ type: 'CLEAR_ERROR' });
};

export const getUserFromAsyncStorage = () =>
  AsyncStorage.getItem('@UserId').then(userId => {
    if (userId != null) {
      return usersService.getUserById(userId);
    }
    return {};
  });

export const checkIfWeKnowThisUserBefore = () => async (dispatch, getState) => {
  //AsyncStorage.removeItem('@UserId');
  const user = await getUserFromAsyncStorage();

  if (Object.keys(user).length) {
    dispatch({
      type: 'CREATE_ROOM_BY_USER_ID',
      id: user.id,
    });

    const userDataLoaded = dispatch(getUserData(user));

    return userDataLoaded.then(() => {
      dispatch({
        type: 'LOGIN_SUCCESS',
        user,
      });
      return Promise.resolve('HALLO');
    });
  }
};
