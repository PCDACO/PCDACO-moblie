import { router } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';

import CarHeader from './car-header';

import CarFooter from '~/components/car-card/car-footer';
import CarImage from '~/components/car-card/car-image';
import { CarResponse } from '~/constants/models/car';

interface CarCardProps {
  car: CarResponse;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: '/(screens)/car-detail/[id]',
          params: { id: car.id, name: car.modelName },
        });
      }}>
      <View className="gap-4 rounded-xl bg-white px-4 py-4 shadow-md">
        <CarHeader name={car.modelName} />
        <CarImage image={car.images[0]} />
        <CarFooter price={car.price} fuelType={car.fuelType} />
      </View>
    </Pressable>
  );
};

export default CarCard;
