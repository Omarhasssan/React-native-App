export const sendObservingNotification = (recieverId, type) => (dispatch, getState) => {
  const updatedNotifications = getState().notifications;
  updatedNotifications.invitations.observing += 1;
  updatedNotifications.invitations.total += 1;

  fetch('https://us-central1-squad-builder.cloudfunctions.net/req/sendNotification', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: recieverId,
      notificationType: type,
      updatedNotifications,
    }),
  });
};

export const sendOfflineNotification = () => (dispatch) => {};
