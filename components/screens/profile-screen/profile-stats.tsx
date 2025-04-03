import React from 'react';
import { View, Text } from 'react-native';

import { formatPriceToVND } from '~/lib/format';

interface ProfileStatsProps {
  bookingsCount: number;
  income: number;
  totalCar: number;
  totalRent: number;
  totalRented: number;
}

const ProfileStats = ({ bookingsCount, income, totalCar }: ProfileStatsProps) => {
  return (
    <View className="gap-4 px-4">
      <View className="border-background/80 flex-row rounded-xl bg-background p-4 shadow-lg">
        <View className="flex-1 items-center justify-center">
          <Text className="text-xl font-bold text-foreground">{formatPriceToVND(income)}</Text>
          <Text className="text-foreground/90 text-sm">Ví điện tử</Text>
        </View>
        <View className="w-0.5 bg-gray-200" />
        <View className="border-background/60 flex-1 items-center justify-center border-r ">
          <Text className="text-xl font-bold text-foreground">{bookingsCount}</Text>
          <Text className="text-foreground/90 text-sm">Tổng lượt đặt</Text>
        </View>
        <View className="w-0.5 bg-gray-200" />
        <View className="border-background/60 flex-1 items-center justify-center border-r ">
          <Text className="text-xl font-bold text-foreground">{totalCar}</Text>
          <Text className="text-foreground/90 text-sm">Tổng số xe</Text>
        </View>
      </View>

      {/* <View className="border-background/60 flex-row rounded-xl bg-background p-4 shadow-md">
        <View className="flex-1 items-center justify-center">
          <Text className="text-xl font-bold text-foreground">{totalRent}</Text>
          <Text className="text-foreground/90 text-sm">Tổng số tiền thuê</Text>
        </View>
        <View className="w-0.5 bg-gray-200" />
        <View className="flex-1 items-center justify-center">
          <Text className="text-xl font-bold text-foreground">{totalRented}</Text>
          <Text className="text-foreground/90 text-sm">Tổng số xe đã thuê</Text>
        </View>
      </View> */}
    </View>
  );
};

export default ProfileStats;
