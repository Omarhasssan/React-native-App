import { notificationsService } from '../Service';

const onObservingNotification = socket => (dispatch) => {
  socket.on('observingNotification', () => {
    console.log('ur call has deserved MAN !');
    dispatch({
      type: 'ADD_OBSERVING_NOTIFICATION',
    });
  });
};
export const removeObservingNotifications = () => (dispatch, getState) => {
  const updatedNotifications = getState().notifications;
  updatedNotifications.invitations.total -= updatedNotifications.invitations.observing;
  const userId = getState().auth.user.id;
  updatedNotifications.invitations.observing = 0;
  dispatch({ type: 'REMOVE_OBSERVING_NOTIFICATIONS' });
  notificationsService.updateNotifications(`Notifications/${userId}`, updatedNotifications);
};

/*
*
* LISTEN TO NOTIFICATIONS
*/
export const listenToNotifications = socket => (dispatch) => {
  dispatch(onObservingNotification(socket));
};
