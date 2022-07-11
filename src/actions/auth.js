import { ApiUtils } from 'utils/apiUtils';

export const login = (data) => {
  return ApiUtils({ url: 'auth/login', method: 'POST', data });
};

export const logout = () => {
  return ApiUtils({ url: 'auth/logout', method: 'POST' });
};

export const gitUser = () => {
  return ApiUtils({ url: 'auth/git_user' });
};
