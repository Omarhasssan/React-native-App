import {
  usersService,
  teamsService,
  roomsService,
  notificationsService,
} from '../Service';
import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';
import { getUserRequest } from './request-actions';
<<<<<<< HEAD
=======

const registerForPushNotificationsAsync = userId => async (dispatch) => {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
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
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d

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
<<<<<<< HEAD

      AsyncStorage.setItem('@UserId', returnedUser.id).then(() =>
        console.log('user saved')
      );
=======
      AsyncStorage.setItem('@UserId', returnedUser.id).then(() => console.log('user saved'));
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
    })
    .catch(err => {
      dispatch({ type: 'SIGNUP_FAILURE', err });
    });

};

export const getUserData = user => async (dispatch, getState) => {
  if (user.teamId) {
    const team = await teamsService.getTeamById(user.teamId);
<<<<<<< HEAD
    dispatch({
      type: 'CREATE_ROOM_BY_TEAM_ID',
      id: user.teamId,
    });
=======
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d

    dispatch({
      type: 'SET_CURNT_TEAM',
      team,
    });
  }

  if (user.roomId) {
    const room = await roomsService.getRoomById(user.roomId);

    dispatch({
      type: 'SET_CREATED_ROOM',
      room,
    });
  }
<<<<<<< HEAD
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
=======
  // load user requests
  dispatch(getUserRequest(user));
  notificationsService.getUserNotifications(user.id).then((notifications) => {
    if (notifications) {
      dispatch({
        type: 'LOAD_USER_NOTIFICATIONS',
        notifications: notifications.val(),
      });
    }
  });
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d

  return Promise.resolve();
};

export const Login = user => (dispatch, getState) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  usersService
    .checkUserFound(user)
<<<<<<< HEAD
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

=======
    .then((user) => {
      const userDataLoaded = dispatch(getUserData(user));
      userDataLoaded.then(() =>
        dispatch({
          type: 'LOGIN_SUCCESS',
          user,
        }));
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
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
<<<<<<< HEAD

export const getUserFromAsyncStorage = () =>
  AsyncStorage.getItem('@UserId').then(userId => {
=======
export const getUserFromAsyncStorage = () =>
  AsyncStorage.getItem('@UserId').then((userId) => {
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
    if (userId != null) {
      return usersService.getUserById(userId);
    }
    return {};
  });
<<<<<<< HEAD

export const checkIfWeKnowThisUserBefore = () => async (dispatch, getState) => {
  //AsyncStorage.removeItem('@UserId');

=======
export const checkIfWeKnowThisUserBefore = () => async (dispatch) => {
  // AsyncStorage.removeItem('@UserId');
  
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
  console.log("=> i'm in checkIfWeKnowThisUserBefore");
  const user = await getUserFromAsyncStorage();

  if (Object.keys(user).length) {
<<<<<<< HEAD
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
=======
    const userDataLoaded = dispatch(getUserData(user));
    userDataLoaded.then(() =>
      dispatch({
        type: 'LOGIN_SUCCESS',
        user,
      }));
  } else return {};
};
export const getKnownUser = () => async (dispatch) => {
  const user = await getUserFromAsyncStorage();

  dispatch(getUserData(user));
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
};
