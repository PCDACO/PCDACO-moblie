import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import HeaderProfile from '~/components/header-home-screen';
import ButtonIcon from '~/components/icon-button/icon-button';
import { Home, CalendarDays, Car, CircleUser, ChevronLeft, Bell } from '~/lib/icons/icon';

const MainLayout = () => {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Home className={focused ? `text-primary` : 'text-muted-foreground'} />
          ),
          tabBarLabel: 'Trang chủ',
          headerTitle: '',
          headerLeft: () => {
            return (
              <View className="px-4">
                <HeaderProfile />
              </View>
            );
          },
          headerRight: () => {
            return (
              <View className="px-1">
                <ButtonIcon icon={Bell} className="bg-background" />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="book"
        options={{
          tabBarIcon: ({ focused }) => (
            <CalendarDays className={focused ? `text-primary` : 'text-muted-foreground'} />
          ),
          tabBarLabel: 'Yêu cầu đặt xe',
          headerTitle: 'Yêu cầu đặt xe',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => {
            return (
              <TouchableOpacity className="p-2" onPress={() => router.back()}>
                <ChevronLeft className="text-primary" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tabs.Screen
        name="cars"
        options={{
          tabBarIcon: ({ focused }) => (
            <Car className={focused ? `text-primary` : 'text-muted-foreground'} />
          ),
          tabBarLabel: 'Danh sách xe',
          headerTitle: 'Danh sách xe',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => {
            return (
              <TouchableOpacity className="p-2" onPress={() => router.back()}>
                <ChevronLeft className="text-primary" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <CircleUser className={focused ? `text-primary` : 'text-muted-foreground'} />
          ),
          tabBarLabel: 'Hồ sơ cá nhân',
          headerTitle: 'Thông tin cá nhân',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => {
            return (
              <TouchableOpacity className="p-2" onPress={() => router.back()}>
                <ChevronLeft className="text-primary" />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Tabs>
  );
};

export default MainLayout;
