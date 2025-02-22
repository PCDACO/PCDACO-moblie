import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { ToastAndroid } from 'react-native';

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
    mutationKey: ['login'],
    mutationFn: async (payload: LoginRequest) => await AuthService.login(payload),
    onSuccess: async (data) => {
      await setTokens(data.value.accessToken, data.value.refreshToken);
      ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
      router.replace('/(main)');
    },
    onError: (error) => {
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
    },
  });

  const registerMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: async (payload: RegisterRequest) => await AuthService.register(payload),
    onSuccess: async (data) => {
      await setTokens(data.value.accessToken, data.value.refreshToken);
      ToastAndroid.show(`${data.message}`, ToastAndroid.SHORT);
      router.replace('/(main)');
    },
    onError: (error) => {
      ToastAndroid.show(`${error}`, ToastAndroid.BOTTOM);
    },
  });

  const refreshTokenMutation = useMutation({
    mutationKey: ['refreshToken'],
    mutationFn: async (refrechToken: string) => await AuthService.refreshToken(refrechToken),
    onSuccess: async (data) => {
      await setTokens(data.value.accessToken, data.value.refreshToken);
      // ToastAndroid.show('Làm mới token thành công', ToastAndroid.SHORT);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { loginMutation, registerMutation, refreshTokenMutation };
};
