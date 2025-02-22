import { Stack } from 'expo-router';
import * as React from 'react';
import { Text, View } from 'react-native';

import Title from '~/components/typography/title';

const ScreenLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="car-detail/[id]"
        options={{
          headerShown: true,
          headerTitle: `Chi tiết xe`,
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="request-car/[id]"
        options={{
          headerShown: true,
          headerTitle: `Chi tiết yêu cầu đặt xe`,
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="booking-list/booking-list"
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: () => {
            return (
              <View className="items-center justify-center  py-2">
                <Title title="Yêu cầu đặt xe" size="xl" />
                <Text className="font-semibold">BookList</Text>
              </View>
            );
          },
          contentStyle: { backgroundColor: '#F0F0F0' },
        }}
      />
      <Stack.Screen
        name="car-form/screen"
        options={() => {
          return {
            headerShown: true,
            headerTitle: `Chỉnh sửa thông tin xe `,
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold' },
            contentStyle: { backgroundColor: '#F0F0F0' },
          };
        }}
      />
    </Stack>
  );
};

export default ScreenLayout;
