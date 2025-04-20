import '../global.css';
import 'expo-dev-client';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AuthProvider from '~/components/permission/auth-provider';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/theme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const queryClient = new QueryClient();
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  const [requestPermission] = useCameraPermissions();
  const { requestForegroundPermissionsAsync } = Location;
  useInitialAndroidBarSync();

  const handlerPermission = React.useCallback(() => {
    // request camera permission
    // eslint-disable-next-line no-unused-expressions
    requestPermission;
  }, []);

  React.useEffect(() => {
    requestForegroundPermissionsAsync();
    handlerPermission();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />

      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <ActionSheetProvider>
            <NavThemeProvider value={NAV_THEME[colorScheme]}>
              <Stack screenOptions={SCREEN_OPTIONS}>
                <AuthProvider>
                  <Stack.Screen name="index" options={TAB_OPTIONS} />
                  <Stack.Screen name="(main)" options={TAB_OPTIONS} />
                  <Stack.Screen name="(auth)" options={TAB_OPTIONS} />
                  <Stack.Screen name="(screen)" options={TAB_OPTIONS} />
                  <Stack.Screen name="(second)" options={TAB_OPTIONS} />
                  <Stack.Screen name="(third)" options={TAB_OPTIONS} />
                </AuthProvider>
              </Stack>
            </NavThemeProvider>
          </ActionSheetProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      <PortalHost />
    </QueryClientProvider>
  );
}

const SCREEN_OPTIONS = {
  animation: 'ios_from_right',
  headerShown: false,
} as const;

const TAB_OPTIONS = {
  animation: 'fade_from_bottom',
  presentation: 'modal',
  headerShown: false,
} as const;
