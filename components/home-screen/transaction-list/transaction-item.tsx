import React from 'react';
import { Pressable, Text, View } from 'react-native';

import Card from '~/components/home-screen/card';
import { DateFormat, formatDateToString, formatPriceToVND } from '~/lib/format';
import { DollarSign, KeyRound } from '~/lib/icons/icon';

interface TransactionItemProps {
  transaction: {
    status: boolean;
    carName: string;
    price: number;
    startDate: Date;
    endDate: Date;
  };
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction: { status, carName, price, startDate, endDate },
}) => {
  return (
    <Card className="flex-row items-center gap-4">
      <View className={`rounded-full p-3 ${status ? ' bg-green-200' : ' bg-blue-200'}`}>
        {status ? (
          <DollarSign className="text-green-600 " size={20} />
        ) : (
          <KeyRound className="text-blue-700" size={20} />
        )}
      </View>
      <View className="gap-1 ">
        <Text className="text-lg font-bold">
          {!status ? 'Yêu cầu đặt xe mới' : 'Đã nhận thanh toán'}
        </Text>
        <Text className="text-muted-foreground">
          {status ? `${formatPriceToVND(price)} ● ${carName}` : `${carName}`}
        </Text>
        <Text className="text-muted-foreground" numberOfLines={1}>
          {!status
            ? `Từ ${formatDateToString(startDate, DateFormat.DayTime)} đến ${formatDateToString(endDate, DateFormat.DayTime)}`
            : `Ngày giao dịch: ${formatDateToString(startDate, DateFormat.DayTime)}`}
        </Text>
      </View>
      <View className="flex-1 items-end">
        {status ? (
          <Pressable
            onPress={() => {
              console.log('Chi tiết');
            }}>
            <Text className="text-lg text-primary">Chi tiết</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              console.log('Xem');
            }}>
            <Text className="text-lg text-primary">Xem</Text>
          </Pressable>
        )}
      </View>
    </Card>
  );
};

export default TransactionItem;
