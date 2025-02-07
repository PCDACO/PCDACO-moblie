import axios from 'axios';

import { storage } from '~/lib/storage';
import { AuthService } from '~/services/auth';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const getAPIUrl = () => {
  const url = process.env.EXPO_PUBLIC_API_URL || '';

  if (!url) {
    throw new Error('API URL is not defined');
  }

  return url;
};

const axiosInstance = axios.create({
  baseURL: getAPIUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    config.cancelToken = source.token;
    const accessToken = await storage.getItem('accessToken');
    const refreshToken = await storage.getItem('refreshToken');

    if (
      accessToken &&
      refreshToken &&
      typeof accessToken === 'string' &&
      typeof refreshToken === 'string'
    ) {
      const validatie = await AuthService.validationToken()
        .then((data) => data)
        .catch((error) => error);

      if (validatie.status === 401) {
        console.log('Refreshing new token...');

        const response = await AuthService.refreshToken(refreshToken)
          .then((data) => data.value)
          .catch((error) => error);

        await storage.setItem('accessToken', response.accessToken);
        await storage.setItem('refreshToken', response.refreshToken);

        config.headers.Authorization = `Bearer ${response.accessToken}`;
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    // else {
    //   console.warn('Invalid or missing token!');
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // source.cancel('Request canceled due to invalid token.');
      await storage.removeItem('accessToken');
      await storage.removeItem('refreshToken');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
