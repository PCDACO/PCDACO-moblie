import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

import { CarDetailResponse } from '~/constants/models/car.model';

interface CarConfigurationProps {
  car: CarDetailResponse;
}

const CarConfiguration: FunctionComponent<CarConfigurationProps> = ({ car }) => {
  const { transmissionType, fuelConsumption, seat, fuelType } = car;

  return (
    <View className="flex-row justify-between gap-4 rounded-xl py-2">
      <View className="items-center justify-center gap-2">
        <Ionicons name="settings-outline" size={20} color="gray" />
        <Text className="text-sm text-muted-foreground">{transmissionType}</Text>
      </View>
      <View className="items-center justify-center gap-2">
        <Ionicons name="speedometer-outline" size={20} color="gray" />
        <Text className="text-sm text-muted-foreground">{fuelConsumption}l /100km</Text>
      </View>
      <View className="items-center justify-center gap-2">
        <MaterialCommunityIcons name="hydraulic-oil-temperature" size={20} color="gray" />
        <Text className="text-sm text-muted-foreground">{fuelType}</Text>
      </View>
      <View className="items-center justify-center gap-2">
        <Ionicons name="people-outline" size={20} color="gray" />
        <Text className="text-sm text-muted-foreground">{seat} chỗ ngồi</Text>
      </View>
    </View>
  );
};

export default CarConfiguration;
