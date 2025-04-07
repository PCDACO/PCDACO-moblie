import { Redirect } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';

import Loading from '../plugins/loading';

import { useTokenValidation } from '~/hooks/auth/use-token-validation';
import { useAuthStore } from '~/store/auth-store';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const { isValidating, validateToken } = useTokenValidation();

  React.useEffect(() => {
    validateToken();
  }, [validateToken]);

  if (isValidating) {
    return (
      <View className="h-full flex-1 items-center justify-center">
        <Loading />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <>{children}</>;
};

export default AuthProvider;
