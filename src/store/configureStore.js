import { createStore ,applyMiddleware} from 'redux'; // 3.7.2
import rootReducer from '../reducers'
import thunkMiddleware from 'redux-thunk'; // 2.2.0

const configureStore = () =>{
  return{
    ...createStore(rootReducer,applyMiddleware(thunkMiddleware))

  }
}

export default configureStore;