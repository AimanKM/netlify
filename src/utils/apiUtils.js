import axios from 'axios';

function ApiUtils({
  url = '',
  params = {},
  method = 'GET',
  data,
}) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Token': localStorage.getItem('accessToken'),
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
