import { notificationsService } from '../Service';
import firebase from '../config/firebase';

let singleton = { onInvitationsNotification: null, onTeamNotification: null };

const onInvitationsNotification = socket => (dispatch, getState) => {
  const userId = getState().auth.user.id;

  if (!singleton.onInvitationsNotification) {
    singleton.onInvitationsNotification = true;
    firebase
      .database()
      .ref(`Notifications/${userId}/invitations`)
      .on('value', snp => {
        if (snp.val() != null)
          dispatch({
            type: 'SET_INVITATIONS_NOTIFICATION',
            invitations: snp.val(),
          });
      });
  }
};
const onTeamNotification = socket => (dispatch, getState) => {
  const teamId = getState().auth.user.teamId;

  if (!singleton.onTeamNotification) {
    singleton.onTeamNotification = true;
    firebase
      .database()
      .ref(`Notifications/${teamId}`)
      .on('value', snp => {
        if (snp.val() != null)
          dispatch({
            type: 'SET_TEAM_NOTIFICATION',
            notifications: snp.val(),
          });
      });
  }
};
export const removeObservingNotifications = () => (dispatch, getState) => {
  let updatedNotifications = JSON.parse(
    JSON.stringify(getState().notifications)
  );
  updatedNotifications.invitations.total -=
    updatedNotifications.invitations.observing;
  const userId = getState().auth.user.id;
  updatedNotifications.invitations.observing = 0;
  notificationsService.updateNotifications(
    `Notifications/${userId}`,
    updatedNotifications
  );
};
export const removeJoiningTeamNotifications = () => (dispatch, getState) => {
  let updatedNotifications = JSON.parse(
    JSON.stringify(getState().notifications)
  );
  updatedNotifications.invitations.total -=
    updatedNotifications.invitations.joiningTeam;
  const userId = getState().auth.user.id;
  updatedNotifications.invitations.joiningTeam = 0;
  notificationsService.updateNotifications(
    `Notifications/${userId}`,
    updatedNotifications
  );
};
export const removeNextMatchesNotifications = () => (dispatch, getState) => {
  let updatedNotifications = {
    ...JSON.parse(JSON.stringify(getState().notifications.team)),
  };
  updatedNotifications.total -= updatedNotifications.nextMatches;
  updatedNotifications.nextMatches = 0;
  const teamId = getState().auth.user.teamId;

  notificationsService.updateNotifications(
    `Notifications/${teamId}`,
    updatedNotifications
  );
};
/*
*
* LISTEN TO NOTIFICATIONS
*/
export const listenToNotifications = () => dispatch => {
  dispatch(onInvitationsNotification());
  dispatch(onTeamNotification());
};
