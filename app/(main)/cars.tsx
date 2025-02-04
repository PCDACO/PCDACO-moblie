import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';

import CarCard from '~/components/car-card';
import { Plus } from '~/lib/icons/icon';

const CarsScreen = () => {
  const cars = [
    {
      id: '1',
      image: 'https://via.placeholder.com/80',
      totalImages: 5,
      name: 'Honda Civic 2024',
      fuelType: 'Xăng',
      price: 1000000,
      status: 'Đang cho thuê',
      rating: 4.9,
      reviews: 18,
      booking: 10,
      statusBooking: 'Hiện đang cho thuê ',
    },
    {
      id: '2',
      image: 'https://via.placeholder.com/80',
      totalImages: 5,
      name: 'BMW X5',
      fuelType: 'Xăng',
      price: 1000000,
      status: 'Đang khả dụng',
      rating: 4.8,
      reviews: 18,
      booking: 10,
      statusBooking: 'Lần cho thuê gần nhất: 2 tháng trước',
    },
    {
      id: '3',
      image: 'https://via.placeholder.com/80',
      totalImages: 5,
      name: 'BMW X5',
      fuelType: 'Xăng',
      price: 1000000,
      status: 'Đang khả dụng',
      rating: 4.8,
      reviews: 18,
      booking: 10,
      statusBooking: 'Lần cho thuê gần nhất: 2 tháng trước',
    },
    {
      id: '4',
      image: 'https://via.placeholder.com/80',
      totalImages: 5,
      name: 'BMW X5',
      fuelType: 'Xăng',
      price: 1000000,
      status: 'Đang khả dụng',
      rating: 4.8,
      reviews: 18,
      booking: 10,
      statusBooking: 'Lần cho thuê gần nhất: 2 tháng trước',
    },
  ];

  return (
    <View>
      <ScrollView className="p-4 ">
        <View className="mb-10 gap-4">
          {cars.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity className="absolute bottom-4 right-4 rounded-full bg-blue-500 p-4">
        <Plus className="text-background" size={16} />
      </TouchableOpacity>
    </View>
  );
};

export default CarsScreen;
