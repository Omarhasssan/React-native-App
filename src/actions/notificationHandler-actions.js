import { usersService } from '../Service';
import { getKnownUser } from './auth-actions';

export const handleNotificationClick = notification => (dispatch, getState) => {
  console.log('=====================');

  if (notification.origin == 'selected') {
    const { data } = notification;
    dispatch({
      type: data.type,
    });
  }
};
