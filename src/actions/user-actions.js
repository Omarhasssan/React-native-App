import {
  usersService,
  teamsService,
  roomsService,
  matchesService,
} from '../Service';
import firebase from '../config/firebase';
/*eslint-disable */
let singleton = { onUserHasTeam: null, onUserHasMatchesToObserve: null };
export const updateUserRoleToCaptain = user => {
  usersService.updateUser(`users/${user.id}/role`, 'CAPTAIN');
  return {
    type: 'UPDATE_CURRENT_USER',
    payload: { type: 'role', value: 'CAPTAIN' },
  };
};
export const updateUserTeam = (userId, teamId) => dispatch => {
  usersService.updateUser(`users/${userId}/teamId`, teamId);
};
export const onUserHasTeam = userId => (dispatch, getState) => {
  const userTeam = getState().teamsReducer.curntTeam;
  if (!singleton.onUserHasTeam) {
    singleton.onUserHasTeam = true;
    firebase
      .database()
      .ref(`${'users'}/${userId}/${'teamId'}`)
      .on('value', async snap => {
        if (!userTeam.id && snap.val()) {
          let teamId = snap.val();
          const team = await teamsService.getTeamById(teamId);
          dispatch({
            type: 'UPDATE_CURRENT_USER',
            payload: { type: 'teamId', value: teamId },
          });

          dispatch({
            type: 'SET_CURNT_TEAM',
            team: team,
          });
          dispatch({
            type: 'CREATE_ROOM_BY_TEAM_ID',
            id: teamId,
          });
        }
      });
  }
};
export const onUserHasMatchesToObserve = userId => dispatch => {
  return new Promise((resolve, reject) => {
    if (!singleton.onUserHasMatchesToObserve) {
      singleton.onUserHasMatchesToObserve = true;
      return firebase
        .database()
        .ref(`MatchesToObserve/${userId}`)
        .on('child_added', async snapshot => {
          const data = snapshot.val();
          console.log('=> HEY MAN I HAVE A MATCH TO OBSERVE', snapshot.val());
          const match = await matchesService.getMatchById(
            snapshot.val(),
            '',
            true
          );
          dispatch({
            type: 'SET_OBSERVING_MATCH',
            match,
          });
        });
    }
  });
};
export const updateUserRoom = (user, room) => dispatch => {
  usersService.updateUser(`users/${user.id}/roomId`, room.id);
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
  usersService.getUsers().then(users => {
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
