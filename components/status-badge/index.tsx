import React from 'react';
import { Text, View } from 'react-native';

interface StatusBagdeProps {
  text: string;
  option: 'success' | 'warning' | 'danger';
}

const StatusBagde: React.FC<StatusBagdeProps> = ({ text, option }) => {
  const getBadgeStyle = (option: 'success' | 'warning' | 'danger') => {
    switch (option) {
      case 'success':
        return 'bg-green-200';
      case 'warning':
        return 'bg-yellow-200';
      case 'danger':
        return 'bg-red-200';
      default:
        return 'bg-gray-200';
    }
  };

  const getTextColor = (option: 'success' | 'warning' | 'danger') => {
    switch (option) {
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'danger':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <View className={`rounded-full p-2 ${getBadgeStyle(option)}`}>
      <Text className={getTextColor(option)}>{text}</Text>
    </View>
  );
};

export default StatusBagde;
