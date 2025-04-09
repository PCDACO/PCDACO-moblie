import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

import { COLORS } from '~/theme/colors';

function HomeButton() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.replace('/(main)')} style={{ marginRight: 16 }}>
      <Ionicons name="home" size={24} color={COLORS.dark.background} />
    </TouchableOpacity>
  );
}

function GoBackButton() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 16 }}>
      <Ionicons name="arrow-back" size={24} color={COLORS.dark.background} />
    </TouchableOpacity>
  );
}

export default function SecondLayout() {
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

          // if (route.name === 'wallet') {
          //   iconName = 'wallet';
          // } else
          if (route.name === 'transaction') {
            iconName = 'swap-horizontal';
          } else if (route.name === 'bank-account') {
            iconName = 'card';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}>
      {/* <Tabs.Screen
        name="wallet"
        options={{
          tabBarLabel: 'Ví',
          title: 'Ví của tôi',
          animation: 'shift',
        }}
      /> */}
      <Tabs.Screen
        name="transaction"
        options={{
          tabBarLabel: 'Giao dịch',
          title: 'Lịch sử giao dịch',
          animation: 'shift',
        }}
      />
      <Tabs.Screen
        name="bank-account"
        options={{
          tabBarLabel: 'Ngân hàng',
          title: 'Tài khoản ngân hàng',
          animation: 'shift',
        }}
      />
    </Tabs>
  );
}
