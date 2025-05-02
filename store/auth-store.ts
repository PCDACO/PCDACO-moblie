import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { storage } from '~/lib/storage';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLogout: boolean;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  removeTokens: () => Promise<void>;
  setLogout: (isLogout: boolean) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLogout: false,

      setTokens: async (accessToken, refreshToken) => {
        await storage.setItem('accessToken', accessToken);
        await storage.setItem('refreshToken', refreshToken);
        set({ accessToken, refreshToken, isAuthenticated: true });
      },

      setIsAuthenticated: (isAuthenticated) => {
        set({ isAuthenticated });
      },

      removeTokens: async () => {
        await storage.removeItem('accessToken');
        await storage.removeItem('refreshToken');
        set({ accessToken: null, refreshToken: null, isAuthenticated: false });
      },

      setLogout: async (isLogout) => {
        set({ isLogout });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
