import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label }) => {
  return (
    <TouchableOpacity className="flex-row items-center justify-between border-b border-gray-200 px-4 py-3">
      <View className="flex-row items-center">
        <Icon className="text-black" size={20} />
        <Text className="ml-3 text-base text-black">{label}</Text>
      </View>
      <Text className="text-gray-400">{'>'}</Text>
    </TouchableOpacity>
  );
};

export default MenuItem;
export type { MenuItemProps };
