import {AuthActionTypes} from '../redux/actionTypes';

export const loginUser = user => {
  return dispatch => {
    const payload = {
      userName: user?.displayName,
      email: user?.email,
      profileImage: user?.photoURL,
    };
    dispatch({
      type: AuthActionTypes.LOGIN_USER,
      payload: payload,
    });
  };
};

export const logoutUser = () => {
  return dispatch => {
    dispatch({
      type: AuthActionTypes.LOGOUT_USER,
    });
  };
};

export const setAppLanguage = language => {
  return dispatch => {
    dispatch({
      type: AuthActionTypes.SET_APP_LANGUAGE,
      payload: language,
    });
  };
};
