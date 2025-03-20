import axios from 'axios';

import { storage } from '~/lib/storage';
import { generateGuid } from '~/lib/utils';
import { AuthService } from '~/services/auth.service';

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
    if (config.url === '/api/auth/login' || config.url === '/api/auth/signup') {
      return config;
    }

    const accessToken = await storage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (config.method === 'post') {
      config.headers['Idempotence-Key'] = generateGuid();
    }

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // const originalRequest = error.config;

    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;

    //   const refreshToken = await storage.getItem('refreshToken');

    //   if (refreshToken) {
    //     const response = await AuthService.refreshToken(refreshToken);

    //     if (response.isSuccess) {
    //       storage.setItem('accessToken', response.value.accessToken);
    //       storage.setItem('refreshToken', response.value.refreshToken);

    //       originalRequest.headers.Authorization = `Bearer ${response.value.accessToken}`;

    //       return axiosInstance(originalRequest);
    //     } else {
    //       storage.removeItem('accessToken');
    //       storage.removeItem('refreshToken');
    //     }
    //   }
    // }

    return Promise.reject(error);
  }
);

export default axiosInstance;
