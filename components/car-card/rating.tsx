import { Star } from 'lucide-react-native';
import React from 'react';
import { View, Text } from 'react-native';

interface RatingProps {
  rating: number;
  reviews: number;
}

const Rating: React.FC<RatingProps> = ({ rating, reviews }) => {
  return (
    <View className="flex-row items-center ">
      <Star className="text-yellow-500" size={16} />
      <Text className="ml-1 text-sm">{rating}</Text>
      <Text className="ml-2 text-sm text-gray-500">● ({reviews} lượt đặt)</Text>
    </View>
  );
};

export default Rating;
