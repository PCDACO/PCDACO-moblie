import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FunctionComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import AuthProvider from '~/components/permission/auth-provider';
import Description from '~/components/screens/car-editor/description';
import Subtitle from '~/components/screens/car-editor/subtitle';

const MainLayout: FunctionComponent = () => {
  const router = useRouter();

  return (
    <AuthProvider>
      <StatusBar hidden />

      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => <FontAwesome5 name="home" color={color} size={20} />,
            tabBarLabel: 'Trang chủ',
            animation: 'shift',
          }}
        />
        <Tabs.Screen
          name="cars"
          options={{
            tabBarIcon: ({ color }) => <FontAwesome5 name="car" color={color} size={20} />,
            tabBarLabel: 'Danh sách xe',
            animation: 'shift',
          }}
        />

        <Tabs.Screen
          name="bookings"
          options={{
            headerShown: true,
            headerTitle: () => (
              <View>
                <Subtitle className="text-2xl" title="Danh sách đặt xe" />
                <Description
                  className="text-sm"
                  title="Tổng hợp các yêu cầu thuê xe đang chờ xét duyệt"
                />
              </View>
            ),
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
            },

            tabBarIcon: ({ color }) => <FontAwesome5 name="calendar-alt" color={color} size={20} />,
            tabBarLabel: 'Danh sách đặt xe',
            animation: 'shift',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => router.push('/(screen)/booking/history')}
                className="mr-3">
                <FontAwesome5 name="history" color="black" size={24} />
              </TouchableOpacity>
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" color={color} size={20} />,
            tabBarLabel: 'Trang cá nhân',
            animation: 'shift',
          }}
        />
      </Tabs>
    </AuthProvider>
  );
};

export default MainLayout;
