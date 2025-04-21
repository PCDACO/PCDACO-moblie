import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { format } from 'date-fns';
import React from 'react';
import { View, Text, Image } from 'react-native';

import ImageGallery from './image-gallery';

import { ScheduleStatusNumber } from '~/constants/enums';
import { InspectionScheduleDetail } from '~/constants/models/car-report.model';
import { translate } from '~/lib/translate';

interface InspectionScheduleCardProps {
  inspectionDetail: InspectionScheduleDetail;
}

const InspectionScheduleCard: React.FC<InspectionScheduleCardProps> = ({ inspectionDetail }) => {
  const convertEnumString = (status: number) => {
    switch (status) {
      case ScheduleStatusNumber.Pending:
        return translate.schedule.status.Pending;
      case ScheduleStatusNumber.Approved:
        return translate.schedule.status.Approved;
      case ScheduleStatusNumber.Rejected:
        return translate.schedule.status.Rejected;
      case ScheduleStatusNumber.InProgress:
        return translate.schedule.status.InProgress;
      case ScheduleStatusNumber.Expired:
        return translate.schedule.status.Expired;
      case ScheduleStatusNumber.Signed:
        return translate.schedule.status.Signed;
      default:
        return 'Không xác định';
    }
  };

  return (
    <View className="mx-4 mt-4 rounded-lg bg-white shadow-sm">
      <View className="p-4">
        <View className="mb-3 flex-row items-center">
          <MaterialIcons name="schedule" size={20} color="#4b5563" />
          <Text className="ml-2 text-lg font-bold text-gray-800">Lịch trình kiểm tra</Text>
        </View>

        <View className="mb-3 flex-row items-center">
          <View className="mr-3 h-10 w-10 overflow-hidden rounded-full">
            <Image
              source={{
                uri: inspectionDetail.technicianAvatar || 'https://via.placeholder.com/40',
              }}
              style={{ width: 40, height: 40 }}
            />
          </View>
          <View>
            <Text className="font-medium text-gray-800">{inspectionDetail.technicianName}</Text>
            <Text className="text-xs text-gray-500">Kỹ sư kiểm tra</Text>
          </View>
        </View>

        <View className="mb-3">
          <View className="mb-1 flex-row items-center">
            <Ionicons name="calendar-outline" size={16} color="#6b7280" />
            <Text className="ml-2 text-gray-700">
              {inspectionDetail.inspectionDate
                ? format(new Date(inspectionDetail.inspectionDate), 'MMM dd, yyyy - HH:mm')
                : 'Not scheduled'}
            </Text>
          </View>

          <View className="mt-2 flex-row items-center">
            <Ionicons name="location-outline" size={16} color="#6b7280" />
            <Text className="ml-2 text-gray-700">{inspectionDetail.inspectionAddress}</Text>
          </View>
        </View>

        {inspectionDetail.note && (
          <View className="mb-3">
            <Text className="mb-1 text-xs text-gray-500">Ghi chú</Text>
            <Text className="text-gray-700">{inspectionDetail.note}</Text>
          </View>
        )}

        {/* Inspection Photos */}
        {inspectionDetail.photoUrls && inspectionDetail.photoUrls.length > 0 && (
          <View>
            <Text className="mb-2 text-xs text-gray-500">Hình ảnh kiểm tra</Text>
            <ImageGallery
              images={inspectionDetail.photoUrls}
              imageWidth={0.4}
              imageHeight={120}
              keyPrefix="inspection-photo"
            />
          </View>
        )}

        <View className="mt-2 rounded-lg bg-gray-100 px-3 py-2">
          <View className="flex-row items-center">
            <AntDesign name="infocirlceo" size={14} color="#6b7280" />
            <Text className="ml-2 text-xs text-gray-600">
              Trạng thái:{' '}
              <Text className="font-medium">{convertEnumString(inspectionDetail.status || 0)}</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InspectionScheduleCard;
