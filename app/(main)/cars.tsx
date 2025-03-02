import { router } from 'expo-router';
import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';

import CarCard from '~/components/car-card';
import { useCarQuery } from '~/hooks/car/use-car';
import { Plus } from '~/lib/icons/icon';

const CarsScreen = () => {
  const { listQuery } = useCarQuery({
    params: {
      limit: 10,
    },
  });

  const { data: cars, isLoading } = listQuery;

  if (isLoading) {
    return <View>Loading...</View>;
  }

  if (!cars) {
    return <View>No cars found</View>;
  }

  return (
    <View>
      <ScrollView className="p-4 ">
        <View className="mb-10 gap-4">
          {cars.value.items.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          router.push('/(screens)/car-form/screen');
        }}
        className="absolute bottom-4 right-4 rounded-full bg-primary p-4">
        <Plus className="text-background" size={16} />
      </TouchableOpacity>
    </View>
  );
};

export default CarsScreen;
