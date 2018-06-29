import { notificationsService } from '../Service';

const onObservingNotification = () => (dispatch) => {};
const onJoiningTeamNotification = () => (dispatch) => {};
export const removeObservingNotifications = () => (dispatch, getState) => {
  const updatedNotifications = JSON.parse(JSON.stringify(getState().notifications));
  updatedNotifications.invitations.total -= updatedNotifications.invitations.observing;
  const userId = getState().auth.user.id;
  updatedNotifications.invitations.observing = 0;
  dispatch({ type: 'REMOVE_OBSERVING_NOTIFICATIONS' });
  notificationsService.updateNotifications(`Notifications/${userId}`, updatedNotifications);
};
export const removeJoiningTeamNotifications = () => (dispatch, getState) => {
  const updatedNotifications = JSON.parse(JSON.stringify(getState().notifications));
  updatedNotifications.invitations.total -= updatedNotifications.invitations.joiningTeam;
  const userId = getState().auth.user.id;
  updatedNotifications.invitations.joiningTeam = 0;
  dispatch({ type: 'REMOVE_JOININGTEAM_NOTIFICATIONS' });
  notificationsService.updateNotifications(`Notifications/${userId}`, updatedNotifications);
};

/*
*
* LISTEN TO NOTIFICATIONS
*/
export const listenToNotifications = () => (dispatch) => {
  dispatch(onObservingNotification());
  dispatch(onJoiningTeamNotification());
};
