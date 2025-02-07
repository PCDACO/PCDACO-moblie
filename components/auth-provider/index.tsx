import { useRouter } from 'expo-router';
import React, { createContext, useContext, useState } from 'react';

import { storage } from '~/lib/storage';

interface AuthContextType {
  isAuthenticated: boolean;
  checkAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  const checkAuthStatus = async () => {
    try {
      const token = await storage.getItem('accessToken');
      if (token) {
        // Validate token if needed or fetch user info
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.replace('/(auth)/login');
      }
    } catch (error) {
      console.log('Error checking authentication status: ', error);

      setIsAuthenticated(false);
      router.replace('/(auth)/login');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
