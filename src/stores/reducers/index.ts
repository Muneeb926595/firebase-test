// in this file import all of reducers and combine them

import {combineReducers} from 'redux';

import Homfford from '../redux/reducer';

const createReducer = (asyncReducers?: any) =>
  combineReducers({
    Homfford,
    ...asyncReducers,
  });

export default createReducer;
