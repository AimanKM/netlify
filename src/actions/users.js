import { ApiUtils } from 'utils/apiUtils';

export const gitUsers = () => {
  return ApiUtils({ url: 'users' });
};

export const addUsers = (data) => {
  return ApiUtils({ url: 'users/add', method: 'POST', data });
};
