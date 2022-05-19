import { ApiUtilsExpress } from 'utils/apiUtils';

export const gitUsers = () => {
  return ApiUtilsExpress({ url: 'users' });
};
