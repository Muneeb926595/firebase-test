import { loginUserUrl, } from '../../api/Endpoint';

import { axiosInstance as axios } from '../../api/axios';
import { AuthActionTypes } from '../redux/actionTypes';
import StorageHelper from '../../utils/StorageHelper';

export const submitLogin = (email, pass) => {
  return dispatch => {
    dispatch({
      type: AuthActionTypes.LOGIN_USER_START,
    });
    const url = loginUserUrl(email, pass);
    axios
      .post(url)
      .then(res => {
        let { data } = res;
        if (data.access_token && data.access_token !== 'undefined') {
          loginUserSuccess(dispatch, data);
        } else {
          loginUserFail(dispatch, 'There was an error connection');
        }
      })
      .catch(error => {
        if (error?.response?.data?.error === 'Unauthorized') {
          alert('Invalid Credentials');
        }
        loginUserFail(dispatch, 'There was an error connection2');
      });
  };
};
const loginUserFail = (dispatch, errorMessage) => {
  dispatch({
    type: AuthActionTypes.LOGIN_USER_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const loginUserSuccess = (dispatch, data) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + data?.access_token;
  StorageHelper.saveItem(
    StorageHelper.StorageKeys.USER_ID,
    data?.user?.id?.toString(),
  );
  StorageHelper.saveItem(
    StorageHelper.StorageKeys.Access_Token,
    data?.access_token?.toString(),
  );

  dispatch({
    type: AuthActionTypes.LOGIN_USER_SUCCESS,
    payload: data,
  });
};
