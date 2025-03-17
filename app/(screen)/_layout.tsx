import { Stack } from 'expo-router';
import React from 'react';

const ScreenLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="booking/index" options={{ headerShown: false }} />
      <Stack.Screen name="cars/index" options={{ headerShown: false }} />
      <Stack.Screen name="user/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="user/password/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="license/license-edit" options={{ headerShown: false }} />
      <Stack.Screen name="cars/edit/index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ScreenLayout;
