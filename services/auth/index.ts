import axiosInstance from '~/configs/axios';
import { LoginRequest, RegisterRequest, Token } from '~/constants/models/auth';

export const AuthService = {
  register: async (req: RegisterRequest): Promise<RootResponse<Token>> => {
    // console.log('Sending register request:', req);

    const response = await axiosInstance
      .post('/api/auth/signup', req)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });

    return response;
  },

  login: async (data: LoginRequest): Promise<RootResponse<Token>> => {
    // console.log('Sending login request:', data);
    const response = await axiosInstance
      .post('/api/auth/login', data)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
    return response;
  },

  getRole: async (): Promise<RootResponse<{ role: Role }>> => {
    const response = await axiosInstance
      .get('/api/users/role')
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });

    return response;
  },

  refreshToken: async (refreshToken: string): Promise<RootResponse<Token>> => {
    try {
      const response = await axiosInstance.post('/api/auth/refresh-token', { refreshToken });
      return response.data;
    } catch (error) {
      throw error;
    }
    // const response = await axiosInstance
    //   .post('/api/auth/refresh-token', { refreshToken })
    //   .then((res) => res.data)
    //   .catch((err) => {
    //     throw err.response.data;
    //   });

    // return response;
  },

  validationToken: async (): Promise<RootResponse<null>> => {
    try {
      const response = await axiosInstance.post('/api/auth/validate-token');
      return response.data;
    } catch (error) {
      throw error;
    }

    // const response = await axiosInstance
    //   .get('/api/auth/validate-token')
    //   .then((res) => res.data)
    //   .catch((err) => {
    //     throw err.response.data;
    //   });

    // return response;
  },
};
