import React from 'react';
import { View, Text } from 'react-native';

import ImageGallery from './image-gallery';
import CarReportBadgeType from '../car-report-list/car-report-badge-type';

interface ReportDetailsCardProps {
  title: string;
  description: string;
  reportType: number;
  imageUrls: string[];
}

const ReportDetailsCard: React.FC<ReportDetailsCardProps> = ({
  title,
  description,
  reportType,
  imageUrls,
}) => {
  return (
    <View className="mx-4 mt-4 rounded-lg bg-white shadow-sm">
      <View className="p-4">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-lg font-bold text-gray-800">Chi tiết báo cáo</Text>
          <CarReportBadgeType type={reportType} textSize="text-sm" />
        </View>

        <View className="mb-3">
          <Text className="mb-1 text-xs text-gray-500">Tiêu đề</Text>
          <Text className="font-medium text-gray-800">{title}</Text>
        </View>

        <View className="mb-3">
          <Text className="mb-1 text-xs text-gray-500">Nội dung</Text>
          <Text className="text-gray-700">{description}</Text>
        </View>

        {/* Report Images */}
        {imageUrls && imageUrls.length > 0 && (
          <View>
            <Text className="mb-2 text-xs text-gray-500">Hình ảnh</Text>
            <ImageGallery
              images={imageUrls}
              imageWidth={0.4}
              imageHeight={120}
              keyPrefix="report-image"
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ReportDetailsCard;
