import { notificationsService } from '../Service';
import firebase from '../config/firebase';

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
/*
*
* LISTEN TO NOTIFICATIONS
*/
export const listenToNotifications = () => dispatch => {
  dispatch(onInvitationsNotification());
  //TODO
  //dispatch(onTeamNotification());
};
