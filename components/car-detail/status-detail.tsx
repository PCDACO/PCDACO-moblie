import React from 'react';
import { Text, View } from 'react-native';

import StatusBagde from '../status-badge';
import Title from '../typography/title';

const StatusDetail = () => {
  return (
    <View>
      <View className=" flex-row justify-between">
        <Title title="Trạng thái" />
        <StatusBagde text="Đang hoạt động" option="success" />
      </View>
      <View className="flex-row justify-between gap-4">
        <View className=" items-center justify-center p-6">
          <Text className="text-md text-muted-foreground">Tổng lượt đặt</Text>
          <Text className="text-2xl font-semibold">24</Text>
        </View>
        <View className=" items-center justify-center p-6">
          <Text className="text-md text-muted-foreground">Lượt đánh giá</Text>
          <Text className="text-2xl font-semibold">4.8</Text>
        </View>
      </View>
    </View>
  );
};

export default StatusDetail;
