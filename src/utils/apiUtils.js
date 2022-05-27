import axios from 'axios';

function ApiUtils({
  url = '',
  params = {},
  method = 'GET',
  data = null,
}) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Token': sessionStorage.getItem('accessToken'),
  };

  return axios({
    baseURL: 'http://localhost:5000/api/',
    method,
    url,
    params,
    data,
    headers,
  });
}

export { ApiUtils };
