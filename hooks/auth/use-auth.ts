import { useMutation } from '@tanstack/react-query';

import { LoginRequest, RegisterRequest } from '~/constants/models/auth.model';
import { QueryKey } from '~/lib/query-key';
import { AuthService } from '~/services/auth.service';

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationKey: [QueryKey.Auth.Login],
    mutationFn: async (payload: LoginRequest) => await AuthService.login(payload),
  });

  const registerMutation = useMutation({
    mutationKey: [QueryKey.Auth.Register],
    mutationFn: async (payload: RegisterRequest) => await AuthService.register(payload),
  });

  const refreshTokenMutation = useMutation({
    mutationKey: [QueryKey.Auth.Refresh],
    mutationFn: async (refrechToken: string) => await AuthService.refreshToken(refrechToken),
  });

  const validateTokenMutation = useMutation({
    mutationKey: [QueryKey.Auth.Validate],
    mutationFn: async () => await AuthService.validationToken(),
  });

  return { loginMutation, registerMutation, refreshTokenMutation, validateTokenMutation };
};
