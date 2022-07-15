import { ApiUtils, ApiUtilsFile } from 'utils/apiUtils';

export const gitUsers = () => {
  return ApiUtils({ url: '/users' });
};

export const addUsers = (data) => {
  return ApiUtils({ url: '/users/add', method: 'POST', data });
};

export const uploadUserProfile = (file) => {
  return ApiUtilsFile({ url: '/users/upload_profile', file });
};

export const deleteUser = (params) => {
  return ApiUtils({ url: '/users/delete', method: 'DELETE', params });
};