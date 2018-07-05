import { usersService } from '../Service';
import { getKnownUser } from './auth-actions';

export const handleNotificationClick = notification => (dispatch, getState) => {
<<<<<<< HEAD
=======
  console.log('=====================');

>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
  if (notification.origin == 'selected') {
    const { data } = notification;
    dispatch({
      type: data.type,
    });
  }
};
<<<<<<< HEAD
export const reset = () => dispatch => {
  dispatch({
    type: 'RESET',
  });
};
=======
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
