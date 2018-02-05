import { combineReducers } from 'redux'; // 3.7.2
import auth from './auth-reducer';
import form from './form-reducer';

const rootReducer = combineReducers({
  auth,
  form,
});

export default rootReducer;
