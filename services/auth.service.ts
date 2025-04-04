import axiosInstance from '~/configs/axios.config';
import {
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  SendOtpRequest,
  Token,
  VerifyOtpRequest,
} from '~/constants/models/auth.model';

export const AuthService = {
  register: async (req: RegisterRequest): Promise<RootResponse<Token>> => {
    try {
      const response = await axiosInstance.post('/api/auth/signup', req);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },

  login: async (data: LoginRequest): Promise<RootResponse<Token>> => {
    try {
      const response = await axiosInstance.post('/api/auth/login', data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },

  refreshToken: async (refreshToken: string): Promise<RootResponse<Token>> => {
    try {
      const response = await axiosInstance.post('/api/auth/refresh-token', { refreshToken });
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },

  validationToken: async (): Promise<RootResponse<null>> => {
    try {
      const response = await axiosInstance.post('/api/auth/validate-token');
      return response.data;
    } catch (error: any) {
      throw error.response;
    }
  },

  sendOtp: async (data: SendOtpRequest): Promise<RootResponse<null>> => {
    try {
      const response = await axiosInstance.post('/api/auth/send-otp', data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },

  verifyOtp: async (data: VerifyOtpRequest): Promise<RootResponse<Token>> => {
    try {
      const response = await axiosInstance.post('/api/auth/verify-otp', data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<RootResponse<null>> => {
    try {
      const response = await axiosInstance.post('/api/auth/reset-password', data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
