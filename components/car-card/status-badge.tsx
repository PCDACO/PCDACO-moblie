import React from 'react';
import { Text, View } from 'react-native';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const isAvailable = status === 'Đang cho thuê';
  return (
    <View className="flex-row items-center">
      <Text className={`text-lg font-medium ${!isAvailable ? 'text-green-600' : 'text-red-600'}`}>
        ● {status}
      </Text>
    </View>
  );
};

export default StatusBadge;
