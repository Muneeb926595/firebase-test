import { AuthActionTypes } from './../redux/actionTypes';
import { AuthState } from '../redux/state';

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
    case AuthActionTypes.LOGIN_USER_START: {
      return { ...state, loading: true };
    }
    case AuthActionTypes.LOGIN_USER_SUCCESS: {
      return {
        ...state,
        authenticated: true,
        user: action.payload.user,
        loading: false,
      };
    }
    case AuthActionTypes.LOGIN_USER_FAIL: {
      return {
        ...state,
        authenticated: false,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
