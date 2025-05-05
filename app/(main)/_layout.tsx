import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FunctionComponent } from 'react';
import { TouchableOpacity } from 'react-native';

import { COLORS } from '~/theme/colors';

const MainLayout: FunctionComponent = () => {
  return (
    <>
      <StatusBar hidden />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.light.primary,
          tabBarStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            paddingTop: 4,
            paddingHorizontal: 12,
          },
          tabBarButton: (props) => {
            // @ts-ignore toi qua met moi roi
            const newProps: TouchableOpacityProps = {
              ...props,
              delayLongPress: props.delayLongPress ?? undefined,
              activeOpacity: 1,
              disabled: props.disabled ?? undefined,
              onBlur: props.onBlur ?? undefined,
            };
            return <TouchableOpacity {...newProps} />;
          },
        }}>
        <Tabs.Screen
          name="home"
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
