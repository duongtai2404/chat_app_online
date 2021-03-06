import axios from 'axios';
import YOUR_IP_COMPUTER from '../constants';

const BASE_URL = `http://${YOUR_IP_COMPUTER}:9000`;

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = async (method, url, body) => {
  switch (method) {
    case 'get':
      return instance.get(url);
    case 'post':
      return instance.post(url, body);
    case 'delete':
      return instance.delete(url);
    case 'put':
      return instance.put(url, body);
    default:
      break;
  }
};

export const configureApiHeaderAuthen = (token) => {
  instance.defaults.headers.common['Authorization'] = `Beare ${token}`;
};
