import { useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { storage } from '~/lib/storage';

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = await storage.getItem('token'); // Load token from storage
      if (savedToken) {
        setToken(savedToken);
      } else {
        router.replace('/(auth)/login'); // Redirect to login if no token
      }
    };

    checkAuth();
  }, []);

  const login = async (newToken: string) => {
    setToken(newToken);
    await storage.setItem('authToken', newToken);
    router.replace('/(main)'); // Redirect to main screen after login
  };

  const logout = async () => {
    setToken(null);
    await storage.removeItem('authToken');
    router.replace('/(auth)/login'); // Redirect to login after logout
  };

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
