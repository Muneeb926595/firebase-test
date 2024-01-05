import {AuthActionTypes} from '../redux/actionTypes';

export const loginUser = user => {
  return dispatch => {
    const payload = {
      userName: user?.displayName,
      email: user?.email,
      profileImage: user?.photoURL,
      uid: user?.uid,
    };
    dispatch({
      type: AuthActionTypes.LOGIN_USER,
      payload: payload,
    });
  };
};

export const updateUser = user => {
  return dispatch => {
    dispatch({
      type: AuthActionTypes.UPDATE_USER,
      payload: user,
    });
  };
};

export const updateWelcomeMessageStatus = status => {
  return dispatch => {
    dispatch({
      type: AuthActionTypes.UPDATE_WELCOME_MESSAGE,
      payload: status,
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
