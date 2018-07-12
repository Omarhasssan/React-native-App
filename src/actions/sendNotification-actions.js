import { usersService } from '../Service';

const sendNormalObservingNotification = recieverId => (dispatch, getState) => {
  const updatedNotifications = getState().notifications;
  updatedNotifications.invitations.observing += 1;
  updatedNotifications.invitations.total += 1;

  fetch(
    'https://us-central1-squad-builder.cloudfunctions.net/req/sendNotification',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usersId: recieverId,
        updatedNotifications,
      }),
    }
  );
};
export const notifyTeamTeamWithNextMatch = teamId => (dispatch, getState) => {
  const teamNotification = {
    ...JSON.parse(JSON.stringify(getState().notifications)).team,
  };
  console.log('tmNotification', teamNotification);
  teamNotification.nextMatches += 1;
  teamNotification.total += 1;

  fetch(
    'https://us-central1-squad-builder.cloudfunctions.net/req/sendNotification',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        teamId: teamId,
        updatedNotifications: teamNotification,
      }),
    }
  );
};
const sendOfflineObservingNotification = userId => async dispatch => {
  const userNotificationToken = await usersService.getUserNotificationToken(
    userId
  );

  fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: userNotificationToken,
      title: 'hello',
      body: 'world',
      data: { type: 'OBSERVING_TAB' },
    }),
  })
    .then(res => {
      dispatch({
        type: 'REMOVE_OBSERVING_NOTIFICATIONS',
      });
    })
    .catch(err => console.log('err', err));
};

export const sendObservingNotification = userId => dispatch => {
  sendNormalObservingNotification(userId);
  dispatch(sendOfflineObservingNotification(userId));
};

export const notifyRoomOwnerWithJoiningTeam = userId => async dispatch => {
  const userNotificationToken = await usersService.getUserNotificationToken(
    userId
  );
  fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: userNotificationToken,
      title: 'hello',
      body: 'world',
      data: { type: 'CREATEDROOM_TAB' },
    }),
  }).catch(err => console.log('err', err));
};

export const sendNormalJoiningTeamNotification = recieverId => (
  dispatch,
  getState
) => {
  const updatedNotifications = JSON.parse(
    JSON.stringify(getState().notifications)
  );

  updatedNotifications.invitations.joiningTeam += 1;
  updatedNotifications.invitations.total += 1;
  fetch(
    'https://us-central1-squad-builder.cloudfunctions.net/req/sendNotification',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usersId: recieverId,
        updatedNotifications,
      }),
    }
  );
};

export const sendOfflineJoiningTeamNotification = playersId => async dispatch => {
  let notifications = [];
  const promises = Object.values(playersId).map(playerId =>
    usersService.getUserNotificationToken(playerId)
  );
  await Promise.all(promises).then(usersNotificationTokens => {
    notifications = usersNotificationTokens.map(userToken => ({
      to: userToken,
      badge: 1,
      body: 'YOU HAVE JOINING TEAM REQUEST CLICK FOR DETAILS ;)',
      data: { type: 'JOININGTEAM_TAB' },
    }));
  });

  fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notifications),
  }).catch(err => console.log('err', err));
};
