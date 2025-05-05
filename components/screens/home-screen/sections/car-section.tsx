import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { CarCard } from '../cards/car-card';

import { CarResponseList } from '~/constants/models/car.model';
import { COLORS } from '~/theme/colors';

interface CarSectionProps {
  recentCars?: CarResponseList[];
}

const CarSection: FunctionComponent<CarSectionProps> = ({ recentCars }) => {
  return (
    <View className="">
      <View className=" flex-row items-center justify-between">
        <Text className="text-lg font-bold text-gray-900 dark:text-gray-100">Xe có sẵn</Text>
        <TouchableOpacity onPress={() => router.push('/cars')} className="flex-row items-center">
          <Text className="mr-1 text-sm text-gray-500 dark:text-gray-400">Xem tất cả</Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.gray} />
        </TouchableOpacity>
      </View>
      {recentCars!.length > 0 ? (
        recentCars!.map((car) => <CarCard key={car.id} car={car} />)
      ) : (
        <View className="items-center justify-center rounded-lg bg-white p-8 dark:bg-slate-300">
          <Ionicons name="car-outline" size={32} color={COLORS.gray} />
          <Text className="mt-2 text-center text-gray-500 dark:text-gray-400">Chưa có xe nào</Text>
        </View>
      )}
    </View>
  );
};

export default CarSection;
