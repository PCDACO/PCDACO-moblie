import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FunctionComponent } from 'react';

import AuthProvider from '~/components/permission/auth-provider';

const MainLayout: FunctionComponent = () => {
  return (
    <AuthProvider>
      <StatusBar hidden />
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => <FontAwesome5 name="home" color={color} size={20} />,
            tabBarLabel: 'Trang chủ',
          }}
        />
        <Tabs.Screen
          name="cars"
          options={{
            tabBarIcon: ({ color }) => <FontAwesome5 name="car" color={color} size={20} />,
            tabBarLabel: 'Danh sách xe',
          }}
        />

        <Tabs.Screen
          name="bookings"
          options={{
            tabBarIcon: ({ color }) => <FontAwesome5 name="calendar-alt" color={color} size={20} />,
            tabBarLabel: 'Danh sách đặt xe',
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" color={color} size={20} />,
            tabBarLabel: 'Trang cá nhân',
          }}
        />
      </Tabs>
    </AuthProvider>
  );
};

export default MainLayout;
