import axios from 'axios';

function ApiUtils(url, params, method = 'GET', data = null) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  return axios({
    baseURL: 'https://rickandmortyapi.com/api/',
    method,
    url,
    params,
    data,
    headers,
  });
}

export { ApiUtils };
