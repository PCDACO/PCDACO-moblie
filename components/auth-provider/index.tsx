import { useEffect } from 'react';

import { useAuthStore } from '~/stores/use-auth-store';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { refetchToken, accessToken } = useAuthStore();
  console.log('provider accessToken', accessToken);

  // console.log('provider isLogged', isLogged);

  useEffect(() => {
    const initAuth = async () => {
      await refetchToken();
      // SplashScreen.hide();
    };
    initAuth();
  }, []);

  return <>{children}</>;
};
