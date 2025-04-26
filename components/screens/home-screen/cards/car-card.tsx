import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import Skeleton from '~/components/nativewindui/Skeleton';
import { CarResponseList } from '~/constants/models/car.model';
import { COLORS } from '~/theme/colors';

interface CarCardProps {
  car: CarResponseList;
}

const CarCardSkeleton = () => {
  return (
    <View className="mb-4 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-300">
      <View className="flex-row">
        <Skeleton width={80} height={80} className="mr-4 rounded-lg" />
        <View className="flex-1">
          <Skeleton width={128} height={24} />
          <Skeleton width={192} height={16} className="mt-2" />
          <View className="mt-2 flex-row items-center">
            <Skeleton width={16} height={16} borderRadius={8} />
            <Skeleton width={128} height={16} className="ml-1" />
          </View>
          <View className="mt-1 flex-row items-center">
            <Skeleton width={16} height={16} borderRadius={8} />
            <Skeleton width={96} height={16} className="ml-1" />
          </View>
          <View className="mt-1 flex-row items-center">
            <Skeleton width={16} height={16} borderRadius={8} />
            <Skeleton width={80} height={16} className="ml-1" />
          </View>
        </View>
      </View>
    </View>
  );
};

export const CarCard = ({ car }: CarCardProps) => {
  const router = useRouter();

  if (!car) {
    return <CarCardSkeleton />;
  }

  const getTransmissionText = (type: string) => {
    switch (type.toLowerCase()) {
      case 'automatic':
        return 'Tự động';
      case 'manual':
        return 'Số sàn';
      default:
        return type;
    }
  };

  return (
    <TouchableOpacity
      className="mb-4 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-300"
      onPress={() =>
        router.push({
          pathname: '/(screen)/cars/detail/[id]',
          params: { id: car.id },
        })
      }>
      <View className="flex-row">
        <View className="mr-4 h-20 w-20 overflow-hidden rounded-lg">
          {car.images?.[0]?.url ? (
            <Image
              source={{ uri: car.images[0].url }}
              className="h-full w-full"
              resizeMode="cover"
            />
          ) : (
            <View className="h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-700">
              <Ionicons name="car-outline" size={24} color={COLORS.gray} />
            </View>
          )}
        </View>
        <View className="flex-1">
          <Text className="text-base font-bold text-gray-900 dark:text-gray-100">
            {car.modelName || 'Chưa có tên xe'}
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            {car.licensePlate || 'Chưa có biển số'}
          </Text>
          <View className="mt-2 flex-row items-center">
            <Ionicons name="car-outline" size={16} color={COLORS.gray} />
            <Text className="ml-1 text-sm text-gray-500 dark:text-gray-400">
              {getTransmissionText(car.transmissionType)} • {car.seat || 0} chỗ
            </Text>
          </View>
          <View className="mt-1 flex-row items-center">
            <Ionicons name="pricetag-outline" size={16} color={COLORS.gray} />
            <Text className="ml-1 text-sm font-medium text-gray-900 dark:text-gray-100">
              {car.price ? `${car.price.toLocaleString('vi-VN')} VND/ngày` : 'Chưa có giá'}
            </Text>
          </View>
          {car.averageRating > 0 && (
            <View className="mt-1 flex-row items-center">
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                {car.averageRating.toFixed(1)} ({car.totalRented || 0} lượt thuê)
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
