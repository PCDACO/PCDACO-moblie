import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';

import ImageGallery from './image-gallery';

import { CarDetail } from '~/constants/models/car-report.model';

interface CarInfoCardProps {
  carDetail: CarDetail;
}

const CarInfoCard: React.FC<CarInfoCardProps> = ({ carDetail }) => {
  return (
    <View className="mx-4 mt-4 overflow-hidden rounded-lg bg-white shadow-sm">
      <View className="p-4">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-lg font-bold text-gray-800">Thông tin xe</Text>
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="car" size={18} color="#6b7280" />
            <Text className="ml-1 font-medium text-gray-600">{carDetail.licensePlate}</Text>
          </View>
        </View>

        {/* Car Images */}
        {carDetail.imageUrl && carDetail.imageUrl.length > 0 && (
          <View className="mb-4">
            <ImageGallery
              images={carDetail.imageUrl}
              imageWidth={0.6}
              imageHeight={150}
              keyPrefix="car-image"
            />
          </View>
        )}

        <View className="flex-row flex-wrap">
          <View className="mb-3 w-1/2">
            <Text className="text-xs text-gray-500">Hãng sản xuất</Text>
            <View className="mt-1 flex-row items-center">
              <FontAwesome5 name="industry" size={14} color="#6b7280" />
              <Text className="ml-2 text-gray-800">{carDetail.manufacturerName}</Text>
            </View>
          </View>
          <View className="mb-3 w-1/2">
            <Text className="text-xs text-gray-500">Mẫu xe</Text>
            <View className="mt-1 flex-row items-center">
              <MaterialCommunityIcons name="car-info" size={16} color="#6b7280" />
              <Text className="ml-2 text-gray-800">{carDetail.modelName}</Text>
            </View>
          </View>
          <View className="w-1/2">
            <Text className="text-xs text-gray-500">Màu sắc</Text>
            <View className="mt-1 flex-row items-center">
              <MaterialCommunityIcons name="palette" size={16} color="#6b7280" />
              <Text className="ml-2 text-gray-800">{carDetail.color}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CarInfoCard;
