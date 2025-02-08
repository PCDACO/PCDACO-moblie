import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { storage } from '~/lib/storage';

interface AuthContextType {
  logout: () => void;
  isLogged: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await storage.getItem('accessToken');

        if (storedToken) {
          const user = jwtDecode(storedToken);
          console.log('user', user);

          setIsLogged(true);
        } else {
          router.replace('/(auth)/login');
        }
      } catch (error) {
        console.error('Failed to fetch the token from storage', error);
      }
    };

    checkToken();
  }, []);

  const logout = async () => {
    await storage.removeItem('accessToken');
    await storage.removeItem('refreshToken');

    router.replace('/(auth)/login');
  };

  return <AuthContext.Provider value={{ logout, isLogged }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
