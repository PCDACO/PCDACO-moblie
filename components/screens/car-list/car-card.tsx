import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import CarStatusBadge from './car-status-badge';

import CardBasic from '~/components/plugins/card-basic';
import { CarResponseList } from '~/constants/models/car.model';
import { COLORS } from '~/theme/colors';
interface CarCardProps {
  car: CarResponseList;
  onDelete?: (id: string) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onDelete }) => {
  const carImage = car.images.find((img) => img.type === 'Car')?.url;

  const router = useRouter();

  const handleDelete = () => {
    onDelete?.(car.id);
  };

  const onDetail = () => {
    router.push({
      pathname: '/(screen)/cars/detail/[id]',
      params: { id: car.id },
    });
  };

  return (
    <CardBasic className="gap-6 bg-white dark:bg-slate-300" onPress={onDetail}>
      {/* Header */}
      <View className=" flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="text-base font-semibold text-black">
            {car.manufacturer.name} - {car.modelName}
          </Text>
          <Text className="mt-0.5 text-sm text-gray-500">{car.price.toLocaleString()} /ngày</Text>
        </View>
        <View className="flex-row gap-2">
          <CarStatusBadge status={car.status} />
          <TouchableOpacity onPress={handleDelete}>
            <Feather name="x-circle" size={16} color={COLORS.light.grey} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Body */}
      {carImage ? (
        <Image
          source={{ uri: carImage }}
          className=" h-40 w-full rounded-md border border-gray-200"
          resizeMode="cover"
        />
      ) : (
        <View className="h-40 w-full items-center justify-center rounded-md border border-gray-200">
          <MaterialCommunityIcons name="image" size={24} color={COLORS.gray} />
          <Text className="text-sm text-gray-500">Không có ảnh</Text>
        </View>
      )}

      {/* Footer */}
      <View className="flex-row items-center justify-between px-4">
        <View className="items-center gap-1">
          <FontAwesome5 name="user-friends" size={20} color="gray" />
          <Text className="text-xs text-gray-700">{car.seat} chỗ</Text>
        </View>
        <View className="items-center  gap-1">
          <Feather name="settings" size={20} color="gray" />
          <Text className="text-xs text-gray-700">{car.transmissionType}</Text>
        </View>
        <View className="items-center gap-1 ">
          <MaterialCommunityIcons name="fuel" size={20} color="gray" />
          <Text className="text-xs text-gray-700">{car.fuelType}</Text>
        </View>
      </View>
    </CardBasic>
  );
};

export default CarCard;
