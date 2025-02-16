import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { LoginRequest, RegisterRequest } from '~/constants/models/auth';
import { QueryKey } from '~/lib/query-key';
import { storage } from '~/lib/storage';
// import { storage } from '~/lib/storage';
import { AuthService } from '~/services/auth';
import { useAuthStore } from '~/stores/use-auth-store';

export const useAuth = () => {
  const router = useRouter();
  const { setTokens } = useAuthStore();

  // get
  // const roleQuery = useQuery({
  //   queryKey: [QueryKey.GETROLE],
  //   queryFn: () => AuthService.getRole(),
  // });

  // post, update, delete
  const loginMutation = useMutation({
    mutationKey: [QueryKey.LOGIN],
    mutationFn: (payload: LoginRequest) => AuthService.login(payload),
    onSuccess: async (data) => {
      await setTokens(data.value.accessToken, data.value.refreshToken);
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
    onSuccess: async (data) => {
      setTokens(data.value.accessToken, data.value.refreshToken);
      // Redirect to login after successful registration
      router.replace('/(main)');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const refreshTokenMutation = useMutation({
    mutationKey: [QueryKey.REFRESH_TOKEN],
    mutationFn: async (refrechToken: string) => await AuthService.refreshToken(refrechToken),
    onSuccess: async (data) => {
      console.log('data refresh token', data);
      await storage.setItem('accessToken', data.value.accessToken);
      await storage.setItem('refreshToken', data.value.refreshToken);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { loginMutation, registerMutation, refreshTokenMutation };
};
