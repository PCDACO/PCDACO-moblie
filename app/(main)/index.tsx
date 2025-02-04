import React from 'react';
import { FlatList, View } from 'react-native';

import CarList from '~/components/home-screen/car-list';
import Card from '~/components/home-screen/card';
import StatisticItem from '~/components/home-screen/statistic';
import TransactionList from '~/components/home-screen/transaction-list';
import WalletOverview from '~/components/home-screen/wallet-overview';
import Divider from '~/components/ui/divider';
import { ArrowLeftRight, Car, CircleDollarSign, Layers } from '~/lib/icons/icon';

const HomeScreen = () => {
  const renderHeader = () => (
    <View className="gap-8 p-4">
      <Card>
        <View className="flex-row items-center justify-stretch">
          <StatisticItem
            icon={CircleDollarSign}
            label="Tổng thu nhập"
            value="280.500.000đ"
            description={12.5}
          />
          <Divider orientation="vertical" />
          <StatisticItem icon={ArrowLeftRight} label="Số giao dịch" value="24" description={12.5} />
        </View>
        <WalletOverview />
      </Card>
      <Card>
        <View className="flex-row justify-between">
          <StatisticItem
            icon={Car}
            label="Số lượng xe đang thuê"
            value="3/15"
            description="Tuần này"
          />
          <Divider orientation="vertical" />
          <StatisticItem
            icon={Layers}
            label="Số lượng yêu cầu đặt xe"
            value="15"
            description="Tuần này"
          />
        </View>
      </Card>
    </View>
  );

  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={() => (
        <View className="gap-8 p-4">
          <CarList />
          <TransactionList />
        </View>
      )}
    />
  );
};

export default HomeScreen;
