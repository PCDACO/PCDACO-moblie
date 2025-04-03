import { Stack } from 'expo-router';
import React from 'react';

const ScreenLayout: React.FC = () => {
  return (
    <Stack>
      {/* Booking - Đặt xe */}
      <Stack.Screen
        name="booking/[id]"
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          animation: 'fade_from_bottom',
          presentation: 'modal',
          title: 'Thông tin đặt xe',
        }}
      />
      <Stack.Screen
        name="booking/history"
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          presentation: 'modal',
          headerTitle: 'Lịch sử đặt xe',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="booking/report/[id]"
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerTitle: 'Báo cáo',
          headerTitleAlign: 'center',
          headerBackButtonDisplayMode: 'minimal',
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'bold',
          },
        }}
      />

      {/* Inspection - Kiểm tra xe */}
      <Stack.Screen
        name="booking/inspection/pre"
        options={{
          headerShown: false,
          animation: 'fade_from_bottom',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="booking/inspection/post"
        options={{
          headerShown: false,
          animation: 'fade_from_bottom',
          presentation: 'modal',
        }}
      />

      {/* Cars - Quản lý xe */}
      <Stack.Screen
        name="cars/detail/[id]"
        options={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}
      />
      <Stack.Screen
        name="cars/edit/index"
        options={{ headerShown: false, animation: 'fade_from_bottom' }}
      />
      <Stack.Screen
        name="cars/pdf"
        options={{
          headerShown: false,
          presentation: 'modal',
          animation: 'fade_from_bottom',
        }}
      />
      <Stack.Screen
        name="cars/contact"
        options={{
          headerShown: true,
          presentation: 'modal',
          animation: 'slide_from_right',
          headerTitle: 'Hợp đồng',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="cars/availability/[id]"
        options={{
          headerBackButtonDisplayMode: 'minimal',
          headerShown: true,
          presentation: 'modal',
          headerTitle: 'Thời gian không cho thuê xe',
          headerTitleAlign: 'center',
        }}
      />

      {/* User - Người dùng & bảo mật */}
      <Stack.Screen
        name="user/[id]"
        options={{ headerShown: false, animation: 'fade_from_bottom' }}
      />
      <Stack.Screen
        name="user/password/[id]"
        options={{ headerShown: false, animation: 'fade_from_bottom' }}
      />

      {/* Bank - Ngân hàng */}
      <Stack.Screen
        name="bank/edit"
        options={{
          headerShown: false,
          animation: 'fade_from_bottom',
          presentation: 'modal',
        }}
      />

      {/* License - Giấy phép */}
      <Stack.Screen
        name="license/license-edit"
        options={{ headerShown: false, animation: 'fade_from_bottom' }}
      />

      {/* Map - Bản đồ */}
      <Stack.Screen
        name="map/index"
        options={{ headerShown: false, presentation: 'modal', animation: 'fade_from_bottom' }}
      />

      {/* Reports - Báo cáo */}
      <Stack.Screen
        name="(reports)/detail/[id]"
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          presentation: 'modal',
          headerTitle: 'Chi tiết báo cáo',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="(reports)/reports"
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          presentation: 'modal',
          headerTitle: 'Danh sách báo cáo',
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  );
};

export default ScreenLayout;
