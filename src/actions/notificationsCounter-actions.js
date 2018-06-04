import { DBHelpers } from "../helpers";

export const addObservingNotification = (userId) => (dispatch) => {
  dispatch({
    type: 'ADD_OBSERVING_NOTIFICATION',
  });
  DBHelpers.updateNotificationsCounter(`NotificationsCnt/${userId}/invitaions/observing`);
};
