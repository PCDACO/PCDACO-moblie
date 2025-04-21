import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

import ScheduleBadge from '../../schedule/schedule-bagde';

import { InspectionScheduleReponse } from '~/constants/models/schedule.model';
import { COLORS } from '~/theme/colors';

interface ScheduleCardProps {
  schedule: InspectionScheduleReponse;
}

export const ScheduleCard = ({ schedule }: ScheduleCardProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="mb-4 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-300"
      onPress={() =>
        router.push({
          pathname: '/(screen)/(schedule)/schedule/[id]',
          params: { id: schedule.id },
        })
      }>
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-base font-bold text-gray-900 dark:text-gray-100">
            {schedule.carOwnerName || 'Chưa có tên xe'}
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            {schedule.inspectionDate
              ? new Date(schedule.inspectionDate).toLocaleDateString('vi-VN')
              : 'Chưa có ngày kiểm định'}
          </Text>
        </View>
        <ScheduleBadge statusName={schedule.statusName} />
      </View>
      <View className="mt-2 flex-row items-center">
        <Ionicons name="location-outline" size={16} color={COLORS.gray} />
        <Text className="ml-1 text-sm text-gray-500 dark:text-gray-400">
          {schedule.inspectionAddress || 'Chưa có địa điểm'}
        </Text>
      </View>
      {schedule.note && (
        <View className="mt-2 flex-row items-start">
          <Ionicons name="document-text-outline" size={16} color={COLORS.gray} />
          <Text className="ml-1 flex-1 text-sm text-gray-500 dark:text-gray-400">
            {schedule.note}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
