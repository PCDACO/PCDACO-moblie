import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FunctionComponent } from 'react';

const MainLayout: FunctionComponent = () => {
  return (
    <>
      <StatusBar hidden />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            paddingTop: 5,
          },
          tabBarIconStyle: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="home" color={color} size={20} style={{ alignSelf: 'center' }} />
            ),
            tabBarLabel: '',
            animation: 'shift',
          }}
        />
        <Tabs.Screen
          name="schedules"
          options={{
            headerShown: true,
            headerTitle: 'Lịch kiểm tra xe',
            headerTitleAlign: 'center',
            headerStyle: {
              height: 60,
            },
            tabBarIcon: ({ color }) => (
              <FontAwesome5
                name="calendar"
                color={color}
                size={20}
                style={{ alignSelf: 'center' }}
              />
            ),
            tabBarLabel: '',
            animation: 'shift',
          }}
        />
        <Tabs.Screen
          name="cars"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="car" color={color} size={20} style={{ alignSelf: 'center' }} />
            ),
            tabBarLabel: '',
            animation: 'shift',
          }}
        />
        <Tabs.Screen
          name="bookings"
          options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: {
              height: 30,
            },
            tabBarIcon: ({ color }) => (
              <FontAwesome5
                name="clipboard-list"
                color={color}
                size={20}
                style={{ alignSelf: 'center' }}
              />
            ),
            tabBarLabel: '',
            animation: 'shift',
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5
                name="user-alt"
                color={color}
                size={20}
                style={{ alignSelf: 'center' }}
              />
            ),
            tabBarLabel: '',
            animation: 'shift',
          }}
        />
      </Tabs>
    </>
  );
};

export default MainLayout;
