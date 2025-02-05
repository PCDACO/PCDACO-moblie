import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import Title from '~/components/typography/title';

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
      <Stack.Screen
        name="request/book-list"
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: () => {
            return (
              <View className="items-center justify-center gap-1 py-2">
                <Title title="Yêu cầu đặt xe" />
                <Text className="font-semibold">BookList</Text>
              </View>
            );
          },
          contentStyle: { backgroundColor: '#F0F0F0' },
        }}
      />
    </Stack>
  );
};

export default CarLayout;
