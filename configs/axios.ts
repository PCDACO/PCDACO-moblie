import axios from 'axios';

import { storage } from '~/lib/storage';
import { generateGuid } from '~/lib/utils';
import { AuthService } from '~/services/auth';
// import { useAuthStore } from '~/stores/use-auth-store';

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    // Accept: 'application/json',
    'Content-Type': 'application/json',
  },

  withCredentials: false,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await storage.getItem('accessToken');
    // const refreshToken = await storage.getItem('refreshToken');

    // if (!accessToken || !refreshToken) {
    //   return config;
    // }

    // const validate = await AuthService.validationToken()
    //   .then((res) => res.value)
    //   .catch((error) => error);

    // if (validate.status === 401) {
    //   const response = await AuthService.refreshToken(refreshToken)
    //     .then((res) => res.value)
    //     .catch((error) => error);

    //   if (response.status === 200 || response.status === 201) {
    //     const { accessToken } = response.data;
    //     await storage.setItem('accessToken', accessToken);
    //     await storage.setItem('refreshToken', refreshToken);
    //     config.headers.Authorization = `Bearer ${accessToken}`;
    //   } else {
    //     await storage.removeItem('accessToken');
    //     await storage.removeItem('refreshToken');

    //     return config;
    //   }
    // }

    // if (validate === undefined) {
    //   await storage.removeItem('accessToken');
    //   await storage.removeItem('refreshToken');
    //   return config;
    // }

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
  async (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
