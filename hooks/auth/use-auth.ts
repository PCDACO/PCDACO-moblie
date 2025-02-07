import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
// import { router } from 'expo-router';

import { LoginRequest, RegisterRequest } from '~/constants/models/auth';
import { QueryKey } from '~/lib/query-key';
import { storage } from '~/lib/storage';
// import { storage } from '~/lib/storage';
import { AuthService } from '~/services/auth';

export const useAuth = () => {
  const router = useRouter();
  const roleQuery = useQuery({
    queryKey: [QueryKey.GETROLE],
    queryFn: () => AuthService.getRole(),
  });

  const loginMutation = useMutation({
    mutationKey: [QueryKey.LOGIN],
    mutationFn: (payload: LoginRequest) => AuthService.login(payload),
    onSuccess: async (data) => {
      await storage.setItem('accessToken', data.value.accessToken);
      await storage.setItem('refreshToken', data.value.refreshToken);
      // Redirect to main screen after successful login
      router.replace('/(main)');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const registerMutation = useMutation({
    mutationKey: [QueryKey.REGISTER],
    mutationFn: (payload: RegisterRequest) => AuthService.register(payload),
    onSuccess: (data) => {
      console.log('data register', data);
      // Redirect to login after successful registration
      // router.replace('/(main)');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { loginMutation, registerMutation, roleQuery };
};
