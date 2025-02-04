import React from 'react';
import { View, Text, Image } from 'react-native';

import Rating from '~/components/car-card/rating';
import Card from '~/components/home-screen/card';

interface CarItemProps {
  car: {
    title: string;
    available: boolean;
    rating: number;
    reviews: number;
  };
}

const CarItem: React.FC<CarItemProps> = ({ car }) => {
  return (
    <Card className="flex-row items-center gap-4">
      <Image source={{ uri: 'https://via.placeholder.com/80' }} className="size-20 rounded-xl" />
      <View className="gap-2">
        <Text>{car.title}</Text>
        <Text className={car.available ? 'text-gray-500' : 'text-red-500'}>
          {car.available ? 'Đang khả dụng' : 'Hiện đang cho thuê'}
        </Text>
        <Rating rating={car.rating} reviews={car.reviews} />
      </View>
    </Card>
  );
};

export default CarItem;
