import { router } from 'expo-router';
import * as React from 'react';
import { View, Text } from 'react-native';

import { Button } from '~/components/nativewindui/Button';
import { Text as TextUI } from '~/components/nativewindui/Text';

const HomeScreen = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Button onPress={() => router.push('/bank/edit')}>
        <TextUI>Thêm tài khoản ngân hàng</TextUI>
      </Button>
    </View>
  );
};

export default HomeScreen;
