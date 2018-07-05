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

      AsyncStorage.setItem('@UserId', returnedUser.id).then(() =>
        console.log('user saved')
      );
    })
    .catch(err => {
      dispatch({ type: 'SIGNUP_FAILURE', err });
    });
};

export const getUserData = user => async (dispatch, getState) => {
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
    console.log('SET_CURNT_TEAM');
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
  const notifications = await notificationsService.getUserNotifications(
    user.id
  );
  const reqs = await dispatch(getUserRequest(getState().socket, user));

  if (notifications) {
    dispatch({
      type: 'LOAD_USER_NOTIFICATIONS',
      notifications: notifications.val(),
    });
  }

  return Promise.resolve();
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
        console.log('USER_DATA_LOADED_SUCCESFFULY');
        dispatch({
          type: 'LOGIN_SUCCESS',
          user,
        });
      });

      // should save to async storage ?
      AsyncStorage.setItem('@UserId', user.id).then(() =>
        console.log('user saved')
      );
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

  console.log("=> i'm in checkIfWeKnowThisUserBefore");
  const user = await getUserFromAsyncStorage();

  if (Object.keys(user).length) {
    dispatch({
      type: 'CREATE_ROOM_BY_USER_ID',
      id: user.id,
    });
    const userDataLoaded = dispatch(getUserData(user));

    return userDataLoaded.then(() => {
      console.log('USER_DATA_LOADED_SUCCESFFULY');
      dispatch({
        type: 'LOGIN_SUCCESS',
        user,
      });
      return Promise.resolve('HALLO');
    });
  }
};
