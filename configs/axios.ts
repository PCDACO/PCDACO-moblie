import axios from 'axios';

import { storage } from '~/lib/storage';

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
  (config) => {
    const token = storage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized, logging out...');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
