import { ApiUtils } from 'utils/apiUtils';

export const gitUsers = () => {
  return ApiUtils({ url: 'users' });
};
