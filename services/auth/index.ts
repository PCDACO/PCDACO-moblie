import axiosInstance from '~/configs/axios';
import { RegisterRequest, Token } from '~/constants/models/auth';

export const AuthService = {
  register: async (req: RegisterRequest): Promise<RootResponse<Token>> => {
    const response = await axiosInstance
      .post('/api/users/signup', req)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });

    return response;
  },

  login: async (req: { email: string; password: string }): Promise<RootResponse<Token>> => {
    const response = await axiosInstance
      .post('/api/users/login', req)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });

    return response;
  },
};
