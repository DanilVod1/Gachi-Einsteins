import { combineReducers, createStore } from 'redux';
import rootReducer from './reducers/reducer';

const store = createStore(
  combineReducers({ global: rootReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
