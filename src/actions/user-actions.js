import { DBHelpers } from '../helpers';
import firebase from '../config/firebase';
/*eslint-disable */

export const updateUserRoleToCaptain = user => {
  DBHelpers.updateUser(`users/${user.id}/role`, 'CAPTAIN');
  return {
    type: 'UPDATE_CURRENT_USER',
    payload: { type: 'role', value: 'CAPTAIN' },
  };
};
export const updateUserTeam = (userId, teamId) => dispatch => {
  DBHelpers.updateUser(`users/${userId}/teamId`, teamId);
};
export const onUserHasTeam = userId => dispatch => {
  let first = true;
  let done = false;

  firebase
    .database()
    .ref(`${'users'}/${userId}`)
    .on('value', async snap => {
      if (first) {
        first = false;
      } else {
        let user = snap.toJSON();
        if (user.teamId && !done) {
          let updatedUser = {};
          updatedUser.team = await DBHelpers.getTeamById(user.teamId);
          done = true;
          dispatch({
            type: 'UPDATE_CURRENT_USER',
            payload: { type: 'teamId', value: user.team.id },
          });

          dispatch({
            type: 'SET_CURNT_TEAM',
            team: user.team,
          });
        }
      }
    });
};
export const onUserHasMatchesToObserve = userId => dispatch => {
  return new Promise((resolve, reject) => {
    return firebase
      .database()
      .ref('MatchesToObserve')
      .on('child_added', async snapshot => {
        // have roomId , playerId
        let match = {};
        const data = snapshot.toJSON();
        if (userId == data.observerId) {
          const room = await DBHelpers.getRoomById(data.roomId);
          match.firstTeam = room.teamOwner;
          if (room.joinedTeam) match.secondTeam = room.joinedTeam;
          if (room.settings.data) match.date = room.settings.date;
          if (room.settings.location) match.location = room.settings.location;
          dispatch({
            type: 'SET_OBSERVING_MATCH',
            match,
          });
        }
      });
  });
};
export const updateUserRoom = (user, room) => dispatch => {
  DBHelpers.updateUser(`users/${user.id}/roomId`, room.id);
  dispatch({
    type: 'UPDATE_CURRENT_USER',
    payload: { type: 'roomId', value: room.id },
  });
  dispatch({
    type: 'SET_CREATED_ROOM',
    room: room,
  });
};

export const getPlayers = () => dispatch =>
  DBHelpers.getUsers().then(users => {
    dispatch({
      type: 'GET_USERS',
      users,
    });
  });

// export const onUserRecordsHasChanged = userId => async dispatch => {
//   /*
//   *records changed
//   *update him if he is curntUser
//   *given TeamId UPDATE him in teamReducer
//   */
//   console.log('fn fn function');
//   let first = true;
//   firebase
//     .database()
//     .ref(`${'users'}/${userId}/${'records'}`)
//     .on('value', data => {
//       const updatedRecord = data.toJSON();
//       if (first) first = false;
//       else {
//         // need teamId , userId , TYPE , VALUE
//         // update in team
//         // update user in teamObeject
//         data.ref.parent.once('value', user => {
//           user = user.toJSON();
//           dispatch({
//             type: 'UPDATE_PLAYER',
//             payload: {
//               teamId: user.teamId,
//               userId: userId,
//               type: 'records',
//               value: updatedRecord,
//             },
//           });
//           // update curntUser
//           dispatch({
//             type: 'UPDATE_CURRENT_USER',
//             payload: { type: 'records', value: updatedRecord },
//           });
//         });
//       }
//     });
// };
export const listenToUserChanges = userId => dispatch => {
  dispatch(onUserHasMatchesToObserve(userId));
  dispatch(onUserHasTeam(userId));
  //dispatch(onUserRecordsHasChanged(userId));
};
