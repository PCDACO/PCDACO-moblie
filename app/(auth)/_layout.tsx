import { Stack } from 'expo-router';
import { FunctionComponent } from 'react';

const AuthLayout: FunctionComponent = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="login"
        options={{
          animation: 'flip',
          presentation: 'transparentModal',
        }}
      />
      <Stack.Screen name="register" />
      <Stack.Screen name="forget-password" />
    </Stack>
  );
};

export default AuthLayout;
