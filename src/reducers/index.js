import { combineReducers } from 'redux'; // 3.7.2
import auth from './auth-reducer';
import form from './form-reducer';
import nav from './nav-reducer';

const rootReducer = combineReducers({
  auth,
  form,
  nav,
});

export default rootReducer;
