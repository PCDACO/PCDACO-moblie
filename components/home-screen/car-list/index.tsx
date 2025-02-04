import React from 'react';
import { View, FlatList } from 'react-native';

import CarItem from '~/components/home-screen/car-list/car-item';
import CarTitle from '~/components/home-screen/car-list/car-title';

const CarList = () => {
  const car = [
    {
      title: 'Xe 1',
      available: true,
      rating: 4.5,
      reviews: 100,
    },
    {
      title: 'Xe 2',
      available: false,
      rating: 4.5,
      reviews: 100,
    },
  ];

  return (
    <View className="gap-6">
      <CarTitle />
      <FlatList
        data={car}
        renderItem={({ item }) => <CarItem car={item} />}
        keyExtractor={(item) => item.title}
        ItemSeparatorComponent={() => <View className="h-2" />}
      />
    </View>
  );
};

export default CarList;
