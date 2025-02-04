import React from 'react';
import { View, Text } from 'react-native';

import Rating from '~/components/car-card/rating';
import StatusBadge from '~/components/car-card/status-badge';

interface CarFooterProps {
  status: string;
  rating: number;
  booking: number;
  price: number;
  fuelType: string;
}

const CarFooter: React.FC<CarFooterProps> = ({ status, rating, booking, price, fuelType }) => {
  return (
    <View className="flex-row items-center justify-between ">
      <View className="gap-1">
        <Text className="w-fit text-xl">Nhiên liệu: {fuelType}</Text>
        <Text className="w-fit text-xl font-semibold">
          {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} / ngày
        </Text>
      </View>
      <View className="gap-1">
        <StatusBadge status={status} />
        <Rating reviews={booking} rating={rating} />
      </View>
    </View>
  );
};

export default CarFooter;
