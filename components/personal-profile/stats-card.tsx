import React from 'react';
import { View, Text } from 'react-native';

const StatsCard = () => {
  const stats = [
    { value: '3', label: 'Số lượng xe' },
    { value: '47', label: 'Tổng số lượt đặt' },
    { value: '280,5tr', label: 'Thu nhập hiện tại' },
  ];

  return (
    <View className="w-full flex-row items-center justify-stretch rounded-xl bg-white p-4 shadow-md">
      {stats.map((item, index) => (
        <View
          key={index}
          className={`flex-1 items-center ${index < stats.length - 1 ? 'border-r border-gray-300 pr-4' : ''}`}>
          <Text className="text-xl font-bold text-black">{item.value}</Text>
          <Text className="mt-1 text-sm text-gray-500">{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default StatsCard;
