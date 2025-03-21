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
      <View className="flex-row justify-between">
        <View className="gap-2">
          <View>
            <Subtitle title={`${car.manufacturer.name} - ${car.modelName}`} />
            <Description title={`Biển số: ${car.licensePlate}`} />
          </View>
        </View>
        <View>
          <Subtitle title={`${formatNumber(car.price)}/ngày`} />
          <View className="flex-row items-end justify-end gap-2">
            <FontAwesome name="star" size={16} color="#FACC15" />
            <Text>
              {car.averageRating}
              <Text className="text-sm text-gray-500">({car.totalRented} lượt thuê)</Text>
            </Text>
          </View>
        </View>
      </View>

      <View className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
        <View className="flex-row justify-between">
          <Description title={`Yêu cầu thế chấp: `} />
          <Text className="text-foreground">{car.requiresCollateral ? 'Có' : 'Không'}</Text>
        </View>
        <View className="flex-row justify-between">
          <Description title={`Màu: `} />
          <Text className="text-foreground">{car.color}</Text>
        </View>
        <View className="flex-row justify-between">
          <Description title={`Địa chỉ nhận: `} />
          <Text className="text-foreground">{car.color}</Text>
        </View>
      </View>
    </View>
  );
};

export default CarBasicInfo;
