import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Edit, EllipsisVertical } from '~/lib/icons/icon';

interface CarHeaderProps {
  name: string;
  statusBooking: string;
}

const CarHeader: React.FC<CarHeaderProps> = ({ name, statusBooking }) => {
  return (
    <View className="flex-row items-center justify-between ">
      <View>
        <Text className="w-fit text-2xl font-semibold">{name}</Text>
        <Text className="text-gray-500">{statusBooking} </Text>
      </View>
      <View className="flex-row items-center gap-2">
        <TouchableOpacity className="rounded-full bg-gray-50 p-2">
          <Edit size={16} className="text-foreground" />
        </TouchableOpacity>
        <TouchableOpacity className="rounded-full bg-gray-50 p-2">
          <EllipsisVertical size={16} className="text-foreground" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CarHeader;
