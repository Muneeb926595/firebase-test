import {combineReducers} from 'redux';

import auth from '../auth/AuthReducers';

const Homfford = combineReducers({
  auth,
});

export default Homfford;
