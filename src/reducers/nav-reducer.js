import { NavigationActions } from 'react-navigation';
import Navigator from '../screens';

const initalState = Navigator.router.getStateForAction(NavigationActions.init());

export default (state = initalState, action) => {
  const nextState = Navigator.router.getStateForAction(action, state);
  return nextState || state;
};
