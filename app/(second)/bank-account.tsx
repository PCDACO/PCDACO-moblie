import { useRouter } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

import { Button } from '~/components/nativewindui/Button';
import { Text as TextUI } from '~/components/nativewindui/Text';

const BankAccount: FunctionComponent = () => {
  const router = useRouter();
  return (
    <View>
      <Text>BankAccount</Text>

      <Button onPress={() => router.push('/bank/edit')}>
        <TextUI>Thêm tài khoản ngân hàng</TextUI>
      </Button>
    </View>
  );
};

export default BankAccount;
