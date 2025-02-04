import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';

const CarLayout = () => {
  const { name } = useLocalSearchParams();
  return (
    <Stack>
      <Stack.Screen
        name="detail/[id]"
        options={{
          headerShown: true,
          headerTitle: `${name}`,
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="request/[id]"
        options={{
          headerShown: true,
          headerTitle: `Chi tiết yêu cầu đặt xe`,
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack>
  );
};

export default CarLayout;
