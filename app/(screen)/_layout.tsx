import { Feather } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

const ScreenLayout: React.FC = () => {
  return (
    <Stack>
      {/* Booking - Đặt xe */}
      <Stack.Screen
        name="booking/page"
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
      <Stack.Screen
        name="booking/contract/[id]"
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerTitle: 'Hợp đồng',
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen
        name="booking/inspection/view"
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerTitle: 'Kiểm tra xe',
          headerTitleAlign: 'center',
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

      {/* Signature */}
      <Stack.Screen
        name="(signature)/car/[id]"
        options={{
          headerShown: true,
          animation: 'slide_from_right',
          presentation: 'modal',
          headerTitle: 'Ký hợp đồng xe',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="(signature)/booking/[id]"
        options={{
          headerShown: true,
          animation: 'slide_from_right',
          presentation: 'modal',
          headerTitle: 'Ký hợp đồng đặt xe',
          headerTitleAlign: 'center',
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
        name="cars/contract"
        options={{
          headerShown: true,
          presentation: 'modal',
          animation: 'slide_from_right',
          headerTitle: 'Hợp đồng',
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen
        name="cars/report/[id]"
        options={{
          headerShown: true,
          presentation: 'modal',
          animation: 'slide_from_right',
          headerTitle: 'Liên hệ hỗ trợ',
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

      <Stack.Screen
        name="map/view"
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          presentation: 'modal',
          headerTitle: 'Bản đồ',
          headerTitleAlign: 'center',
        }}
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
        name="(reports)/car-detail/[id]"
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerTitle: 'Chi tiết báo cáo xe',
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen
        name="(schedule)/schedule/[id]"
        options={{
          headerShown: true,
          animation: 'slide_from_right',
          headerTitle: 'Chi tiết lịch đặt xe',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Pressable onPress={() => router.push('/(main)/home')}>
              <Feather name="home" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="privacy/index"
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          presentation: 'modal',
          headerTitle: '',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="(withdraw)/index"
        options={{
          headerShown: false,
          animation: 'fade_from_bottom',
          headerTitle: 'Rút tiền',
          headerTitleAlign: 'center',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
};

export default ScreenLayout;
