export const BASE = 'api end point';

export const loginUserUrl = (email, pass) => {
  return encodeURI(`login?email=${email}&password=${pass}`);
};