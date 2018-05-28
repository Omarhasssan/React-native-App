export default function (state = {}, action) {
  switch (action.type) {
    case 'SET_CURNT_TEAM_DETAILS':
      return { ...action.teamRecords };
    default:
      return state;
  }
}
