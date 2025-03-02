import React from 'react';
import { View, Image, Text } from 'react-native';

import { Car } from '~/lib/icons/icon';

interface CarImageProps {
  image?: {
    id: string;
    url: string;
  };
}

const CarImage: React.FC<CarImageProps> = ({ image }) => {
  return (
    <View className="relative">
      {image ? (
        <Image source={{ uri: image.url }} className="h-40 w-full rounded-lg " resizeMode="cover" />
      ) : (
        <View className="flex h-40 w-full items-center justify-center rounded-lg bg-gray-200">
          <Car className=" w-full rounded-lg text-foreground" />
          <Text className="  transform text-lg text-foreground">No Image</Text>
        </View>
      )}
    </View>
  );
};

export default CarImage;
