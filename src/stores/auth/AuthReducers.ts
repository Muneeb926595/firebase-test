import {AuthActionTypes} from './../redux/actionTypes';
import {AuthState} from '../redux/state';
import {Languages} from '../../view/screens/settings/types';

const INITIAL_STATE: AuthState = {
  user: {},
  authenticated: false,
  loading: false,
  showWelcomeMessage: true,
  selectedAppLanguage: Languages.English,
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
    case AuthActionTypes.UPDATE_USER: {
      return {
        ...state,
        user: {...state.user, ...action.payload},
        loading: false,
      };
    }
    case AuthActionTypes.UPDATE_WELCOME_MESSAGE: {
      return {
        ...state,
        showWelcomeMessage: action.payload,
      };
    }
    case AuthActionTypes.SET_APP_LANGUAGE: {
      return {
        ...state,
        selectedAppLanguage: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
