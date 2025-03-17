import { useRouter } from 'expo-router';
import * as React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/nativewindui/Button';
import { Text as TextUI } from '~/components/nativewindui/Text';

const HomeScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <Button onPress={() => router.push('/login')}>
        <TextUI>Login</TextUI>
      </Button>
    </SafeAreaView>
  );
};

export default HomeScreen;
