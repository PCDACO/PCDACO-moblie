import { router } from 'expo-router';
import { useCallback, useState } from 'react';

import { AuthService } from '~/services/auth.service';
import { useAuthStore } from '~/store/auth-store';

export const useTokenValidation = () => {
  const [isValidating, setIsValidating] = useState(false);
  const { accessToken, removeTokens } = useAuthStore();

  const validateToken = useCallback(async () => {
    try {
      // const response = await AuthService.validationToken();
    } catch (error: any) {
      throw new Error(error);
    }
  }, [accessToken, isValidating, removeTokens]);

  return {
    isValidating,
    validateToken,
  };
};
