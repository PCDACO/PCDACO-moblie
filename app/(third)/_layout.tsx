import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

import { COLORS } from '~/theme/colors';

function HomeButton() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.replace('/(main)/home')} style={{ marginRight: 16 }}>
      <Ionicons name="home" size={24} color={COLORS.dark.background} />
    </TouchableOpacity>
  );
}

function GoBackButton() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.replace('/(main)/profile')} style={{ marginLeft: 16 }}>
      <Ionicons name="arrow-back" size={24} color={COLORS.dark.background} />
    </TouchableOpacity>
  );
}

const ThirdLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        animation: 'shift',
        headerShown: true,
        headerTitleAlign: 'center',
        headerLeft: () => <GoBackButton />,
        headerRight: () => <HomeButton />,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'car-report') {
            iconName = 'car';
          } else if (route.name === 'book-report') {
            iconName = 'book';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarInactiveTintColor: 'gray',
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
      })}>
      <Tabs.Screen
        name="book-report"
        options={{
          tabBarLabel: 'Đặt xe',
          title: 'Báo cáo đặt xe',
          animation: 'fade',
        }}
      />
      <Tabs.Screen
        name="car-report"
        options={{
          tabBarLabel: 'Xe',
          title: 'Báo cáo xe',
          animation: 'fade',
        }}
      />
    </Tabs>
  );
};

export default ThirdLayout;
