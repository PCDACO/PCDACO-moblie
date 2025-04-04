import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';

import Description from '../car-editor/description';
import Subtitle from '../car-editor/subtitle';

import { CarDetailResponse } from '~/constants/models/car.model';
import { formatNumber } from '~/lib/utils';

interface CarBasicInfoProps {
  car: CarDetailResponse;
}

const CarBasicInfo: React.FC<CarBasicInfoProps> = ({ car }) => {
  return (
    <View className="">
      {/* Header */}
      <View className="flex-row justify-between">
        <View className="flex-1 pr-4">
          <Subtitle title={`${car.manufacturer.name} - ${car.modelName}`} />
          <Description title={`Biển số: ${car.licensePlate}`} />
        </View>
        <View className="items-end">
          <Subtitle title={`${formatNumber(car.price)}/ngày`} />
          <View className="flex-row items-center gap-1">
            <FontAwesome name="star" size={16} color="#FACC15" />
            <Text numberOfLines={1} ellipsizeMode="tail">
              {car.averageRating}{' '}
              <Text className="text-sm text-gray-500">({car.totalRented} lượt thuê)</Text>
            </Text>
          </View>
        </View>
      </View>
      {/* Detail Box */}
      <View className="mt-4 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
        <View className="flex-row justify-between">
          <Description className="text-sm" title="Yêu cầu thế chấp:" />
          <Text className="flex-1 text-right text-foreground">
            {car.requiresCollateral ? 'Có' : 'Không'}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Description className="text-sm" title="Màu:" />
          <Text className="flex-1 text-right text-foreground">{car.color}</Text>
        </View>
        <View className="flex-row items-start justify-between" style={{ gap: 40 }}>
          <Description className="text-sm" title="Địa chỉ nhận xe:" />
          <Text className="flex-1 break-words text-right text-foreground" numberOfLines={2}>
            {car.pickupLocation.address}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CarBasicInfo;
