import React from 'react';
import { View, Image, Text } from 'react-native';

interface CarImageProps {
  image: string;
  totalImages: number;
}

const CarImage: React.FC<CarImageProps> = ({ image, totalImages }) => {
  return (
    <View className="relative">
      <Image source={{ uri: image }} className="h-40 w-full rounded-lg" resizeMode="cover" />
      <Text className="absolute right-2 top-2 rounded-xl bg-black/60 px-3 py-1 text-sm text-white">
        1/{totalImages}
      </Text>
    </View>
  );
};

export default CarImage;
