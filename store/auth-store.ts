import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';
import { router } from 'expo-router';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { storage } from '~/lib/storage';
import { AuthService } from '~/services/auth.service';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  removeTokens: () => Promise<void>;
  validateToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

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

      validateToken: async () => {
        await AuthService.validationToken()
          .then(() => {
            set({
              accessToken: get().accessToken,
              refreshToken: get().refreshToken,
              isAuthenticated: true,
            });
          })
          .catch(() => {
            router.replace('/login');
          });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        console.log('onRehydrateStorage', state);
      },
    }
  )
);
