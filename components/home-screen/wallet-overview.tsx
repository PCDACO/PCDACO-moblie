import React from 'react';
import { View } from 'react-native';

import ButtonIcon from '~/components/icon-button/icon-button';
import { Wallet } from '~/lib/icons/icon';

const WalletOverview: React.FC = () => {
  return (
    <View className="mt-4">
      <ButtonIcon
        className="flex-row text-foreground"
        icon={Wallet}
        iconColor="white"
        iconSize={20}
        label="Xem chi tiết ví"
        onPress={() => console.log('Xem chi tiết ví')}
      />
    </View>
  );
};

export default WalletOverview;
