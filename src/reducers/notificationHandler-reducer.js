const intialState = {
  screen: '',
<<<<<<< HEAD
  screenProps: { activeTab: '', observingTab: false, joiningTeamsTab: false },
};
export default function(state = intialState, action) {
=======
  screenProps: { activeTab: '', observingTab: false },
};
export default function (state = intialState, action) {
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
  switch (action.type) {
    case 'OBSERVING_TAB':
      console.log('then OBSERVING_TAB');
      return {
        ...state,
        screen: 'Profile',
<<<<<<< HEAD
        screenProps: {
          ...state.screenProps,
          activeTab: 'Invitations',
          observingTab: true,
        },
=======
        screenProps: { ...state.screenProps, activeTab: 'Invitations', observingTab: true },
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
      };
    case 'JOININGTEAM_TAB':
      console.log('then JOININGTEAM_TAB');
      return {
        ...state,
        screen: 'Profile',
<<<<<<< HEAD
        screenProps: {
          ...state.screenProps,
          activeTab: 'Invitations',
          joiningTeamsTab: true,
        },
=======
        screenProps: { ...state.screenProps, activeTab: 'Invitations', joinigTeams: true },
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
      };
    case 'CREATEDROOM_TAB':
      console.log('then CREATEDROOM_TAB');
      return {
        ...state,
        screen: 'Profile',
        screenProps: { ...state.screenProps, activeTab: 'CreateOrJoinRoom' },
      };
<<<<<<< HEAD
    case 'RESET':
      return {
        screen: '',
        screenProps: {
          activeTab: '',
          observingTab: false,
          joiningTeamsTab: false,
        },
      };
=======
>>>>>>> 0686b625329827a35a844f4e9a76da21ab295f5d
    default:
      return state;
  }
}
