import axios from 'axios';

import { storage } from '~/lib/storage';
import { generateGuid } from '~/lib/utils';
import { AuthService } from '~/services/auth.service';
import { useAuthStore } from '~/store/auth-store';

export const handleApiError = async (error: any) => {
  const originalRequest = error.config;
  const { setTokens, removeTokens } = useAuthStore.getState();

  // If error is 401 and we haven't tried to refresh token yet
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const refreshToken = await storage.getItem('refreshToken');

    if (!refreshToken) {
      await removeTokens();
      throw new Error('No refresh token available');
    }
  }

  return Promise.reject(error);
};

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  timeout: 20000,
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
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => handleApiError(error)
);

export default axiosInstance;
