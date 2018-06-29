const intialState = {
  screen: '',
  screenProps: { activeTab: '', observingTab: false },
};
export default function (state = intialState, action) {
  switch (action.type) {
    case 'OBSERVING_TAB':
      console.log('then OBSERVING_TAB');
      return {
        ...state,
        screen: 'Profile',
        screenProps: { ...state.screenProps, activeTab: 'Invitations', observingTab: true },
      };
    case 'JOININGTEAM_TAB':
      console.log('then JOININGTEAM_TAB');
      return {
        ...state,
        screen: 'Profile',
        screenProps: { ...state.screenProps, activeTab: 'Invitations', joinigTeams: true },
      };
    case 'CREATEDROOM_TAB':
      console.log('then CREATEDROOM_TAB');
      return {
        ...state,
        screen: 'Profile',
        screenProps: { ...state.screenProps, activeTab: 'CreateOrJoinRoom' },
      };
    default:
      return state;
  }
}
