import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';

import CarFooter from '~/components/car-card/car-footer';
import CarInfo from '~/components/car-card/car-header';
import CarImage from '~/components/car-card/car-image';

interface CarCardProps {
  car: {
    id: string;
    image: string;
    totalImages: number;
    name: string;
    fuelType: string;
    price: number;
    status: string;
    rating: number;
    reviews: number;
    booking: number;
    statusBooking: string;
  };
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  // const navigation = useNavigation();
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        router.navigate(`/(cars)/detail/${car.id}`);
        router.setParams({
          id: car.id,
          name: car.name,
        });
      }}>
      <View className="gap-4 rounded-xl bg-white px-4 py-4 shadow-md">
        <CarInfo name={car.name} statusBooking={car.statusBooking} />
        <CarImage image={car.image} totalImages={car.totalImages} />
        <CarFooter
          status={car.status}
          rating={car.rating}
          booking={car.booking}
          price={car.price}
          fuelType={car.fuelType}
        />
      </View>
    </Pressable>
  );
};

export default CarCard;
