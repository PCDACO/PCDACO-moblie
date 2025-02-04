import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { View, Text } from 'react-native';

interface StatisticItemProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  description: string | number;
}

const StatisticItem: React.FC<StatisticItemProps> = ({ icon: Icon, label, value, description }) => {
  return (
    <View className="flex-1 items-center justify-center gap-2">
      <View className="flex-row items-center gap-2 ">
        <Icon className="text-muted-foreground" size={16} />
        <Text className="text-sm text-muted-foreground">{label}</Text>
      </View>
      <Text className="text-2xl font-semibold text-black">{value}</Text>
      <Text
        className={`text-xs ${typeof description === 'number' ? 'text-green-500' : 'text-muted-foreground'}`}>
        {typeof description === 'number' ? `+${description}%` : description}
      </Text>
    </View>
  );
};

export default StatisticItem;
