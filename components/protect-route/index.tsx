import { Redirect } from 'expo-router';

import { useAuthStore } from '~/stores/use-auth-store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLogged } = useAuthStore();

  if (!isLogged) {
    return <Redirect href="/(auth)/login" />;
  }

  return <>{children}</>;
};
