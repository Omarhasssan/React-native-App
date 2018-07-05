import { usersService } from '../Service';
import { getKnownUser } from './auth-actions';

export const handleNotificationClick = notification => (dispatch, getState) => {
  if (notification.origin == 'selected') {
    const { data } = notification;
    dispatch({
      type: data.type,
    });
  }
};
export const reset = () => dispatch => {
  dispatch({
    type: 'RESET',
  });
};
