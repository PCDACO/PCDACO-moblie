import axios from 'axios';

import { storage } from '~/lib/storage';

// const CancelToken = axios.CancelToken;
// const source = CancelToken.source();

// const getAPIUrl = () => {
//   const url = process.env.EXPO_PUBLIC_API_URL || '';

//   if (!url) {
//     throw new Error('API URL is not defined');
//   }

//   return url;
// };

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await storage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // if (config.method === 'post') {
    //   config.headers['Idempotence-Key'] = generateGuid();
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
    // if (error.response && error.response.status === 401) {
    //   // source.cancel('Request canceled due to invalid token.');
    //   await storage.removeItem('accessToken');
    //   await storage.removeItem('refreshToken');
    // }

    return Promise.reject(error);
  }
);

export default axiosInstance;
