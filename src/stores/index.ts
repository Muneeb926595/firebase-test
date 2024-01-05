import createReducer from './reducers';
import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';

const middlewares = [thunk];

const store = configureStore({
  reducer: createReducer(),
  middleware: middlewares,
});

export default store;
