import {AuthActionTypes} from './../redux/actionTypes';
import {AuthState} from '../redux/state';

const INITIAL_STATE: AuthState = {
  user: {},
  authenticated: false,
  loading: false,
};
interface Action {
  payload: any;
  type: string;
}
const AuthReducer = (
  state: AuthState = INITIAL_STATE,
  action: Action,
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_USER: {
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        loading: false,
      };
    }
    case AuthActionTypes.LOGOUT_USER: {
      return {
        ...state,
        authenticated: false,
        user: null,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
