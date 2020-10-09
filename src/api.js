import axios from 'axios';
import { HttpStatus, URL } from './const';

export const createAPI = (onUnauthorized, onError) => {
  const api = axios.create({
    baseURL: URL,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const { response } = err;

    if (response.status === HttpStatus.UNAUTHORIZED) {
      onUnauthorized();
      throw err;
    }

    onError(err);

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
