import axios from 'axios';
import auth from './firebase';

function ApiUtils({
  url = '',
  params = {},
  method = 'GET',
  data = null,
}) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Token': auth.currentUser.accessToken,
  };

  return axios({
    // eslint-disable-next-line no-undef
    baseURL: process.env.REACT_APP_BASE_URL,
    method,
    url,
    params,
    data,
    headers,
  });
}

export { ApiUtils };
