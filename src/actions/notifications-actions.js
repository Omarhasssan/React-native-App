import { notificationsService } from '../Service';
import firebase from '../config/firebase';

<<<<<<< HEAD
let singleton = { onInvitationsNotification: null };

const onInvitationsNotification = socket => (dispatch, getState) => {
  const userId = getState().auth.user.id;

  if (!singleton.onInvitationsNotification) {
    singleton.onInvitationsNotification = true;
    firebase
      .database()
      .ref(`Notifications/${userId}/invitations/joiningTeam`)
      .on('value', snp => {
        if (snp.val())
          dispatch({
            type: 'ADD_JOININGTEAM_NOTIFICATION',
          });
      });
    firebase
      .database()
      .ref(`Notifications/${userId}/invitations/observing`)
      .on('value', snp => {
        if (snp.val())
          dispatch({
            type: 'ADD_OBSERVING_NOTIFICATION',
          });
      });
  }
};

export const removeObservingNotifications = () => (dispatch, getState) => {
  const updatedNotifications = getState().notifications;
  updatedNotifications.invitations.total -=
    updatedNotifications.invitations.observing;
=======
const onObservingNotification = () => (dispatch) => {};
const onJoiningTeamNotification = () => (dispatch) => {};
export const removeObservingNotifications = () => (dispatch, getState) => {
  const updatedNotifications = JSON.parse(JSON.stringify(getState().notifications));
  updatedNotifications.invitations.total -= updatedNotifications.invitations.observing;
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
  const userId = getState().auth.user.id;
  updatedNotifications.invitations.observing = 0;
  dispatch({ type: 'REMOVE_OBSERVING_NOTIFICATIONS' });
  notificationsService.updateNotifications(
    `Notifications/${userId}`,
    updatedNotifications
  );
};
export const removeJoiningTeamNotifications = () => (dispatch, getState) => {
  const updatedNotifications = getState().notifications;
  updatedNotifications.invitations.total -=
    updatedNotifications.invitations.joiningTeam;
  const userId = getState().auth.user.id;
  updatedNotifications.invitations.joiningTeam = 0;
  dispatch({ type: 'REMOVE_JOININGTEAM_NOTIFICATIONS' });
  notificationsService.updateNotifications(
    `Notifications/${userId}`,
    updatedNotifications
  );
};
<<<<<<< HEAD
=======
export const removeJoiningTeamNotifications = () => (dispatch, getState) => {
  const updatedNotifications = JSON.parse(JSON.stringify(getState().notifications));
  updatedNotifications.invitations.total -= updatedNotifications.invitations.joiningTeam;
  const userId = getState().auth.user.id;
  updatedNotifications.invitations.joiningTeam = 0;
  dispatch({ type: 'REMOVE_JOININGTEAM_NOTIFICATIONS' });
  notificationsService.updateNotifications(`Notifications/${userId}`, updatedNotifications);
};

>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
/*
*
* LISTEN TO NOTIFICATIONS
*/
<<<<<<< HEAD
export const listenToNotifications = () => dispatch => {
  dispatch(onInvitationsNotification());
  //TODO
  //dispatch(onTeamNotification());
=======
export const listenToNotifications = () => (dispatch) => {
  dispatch(onObservingNotification());
  dispatch(onJoiningTeamNotification());
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
};
