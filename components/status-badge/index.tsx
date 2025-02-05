import React from 'react';
import { Text, View } from 'react-native';

import { cn } from '~/lib/utils';

interface StatusBagdeProps {
  text: string;
  option: 'success' | 'warning' | 'danger';
  className?: string;
}

const StatusBagde: React.FC<StatusBagdeProps> = ({ text, option, className }) => {
  const getBadgeStyle = (option: 'success' | 'warning' | 'danger') => {
    switch (option) {
      case 'success':
        return 'bg-green-200';
      case 'warning':
        return 'bg-yellow-50';
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
    <View className={cn(`rounded-full px-4 py-1 ${getBadgeStyle(option)}`, className)}>
      <Text className={getTextColor(option)}>{text}</Text>
    </View>
  );
};

export default StatusBagde;
