import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';

import { LoginRequest, RegisterRequest } from '~/constants/models/auth';
import { QueryKey } from '~/lib/query-key';
import { AuthService } from '~/services/auth';

export const useRegister = (req: RegisterRequest) => {
  const mutation = useMutation({
    mutationKey: [QueryKey.REGISTER],
    mutationFn: async () => {
      AuthService.register(req);
    },
    onSuccess: () => {
      // Redirect to login after successful registration
      router.replace('/(auth)/login');
    },

    onError: (error) => {
      console.error(error);
    },
  });

  return mutation;
};

export const useLogin = (req: LoginRequest) => {
  const mutation = useMutation({
    mutationKey: [QueryKey.LOGIN],
    mutationFn: async (req: { email: string; password: string }) => {
      AuthService.login(req);
    },
    onSuccess: () => {
      // Redirect to main screen after successful login
      router.replace('/(main)');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return mutation;
};
