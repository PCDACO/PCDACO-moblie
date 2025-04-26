import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

import ScheduleBadge from '../../schedule/schedule-bagde';

import Skeleton from '~/components/nativewindui/Skeleton';
import { ScheduleStatus } from '~/constants/enums';
import { InspectionScheduleReponse } from '~/constants/models/schedule.model';
import { cn } from '~/lib/cn';
import { translate } from '~/lib/translate';
import { COLORS } from '~/theme/colors';

interface ScheduleCardProps {
  schedule: InspectionScheduleReponse;
}

const ScheduleCardSkeleton = () => {
  return (
    <View className="mb-4 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-300">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Skeleton width={128} height={24} />
          <Skeleton width={192} height={16} className="mt-2" />
        </View>
        <Skeleton width={80} height={24} />
      </View>
      <View className="mt-2 flex-row items-center">
        <Skeleton width={16} height={16} borderRadius={8} />
        <Skeleton width={128} height={16} className="ml-1" />
      </View>
      <View className="mt-2 flex-row items-start">
        <Skeleton width={16} height={16} borderRadius={8} />
        <Skeleton width={192} height={16} className="ml-1" />
      </View>
    </View>
  );
};

export const ScheduleCard = ({ schedule }: ScheduleCardProps) => {
  const router = useRouter();

  if (!schedule) {
    return <ScheduleCardSkeleton />;
  }

  const getStatusClasses = (status: string) => {
    switch (status) {
      case ScheduleStatus.Pending:
        return {
          translate: translate.schedule.status.Pending,
          borderColor: 'border-r-4 border-r-yellow-400',
        };
      case ScheduleStatus.Approved:
        return {
          translate: translate.schedule.status.Approved,
          borderColor: 'border-r-4 border-r-green-400',
        };
      case ScheduleStatus.Rejected:
        return {
          translate: translate.schedule.status.Rejected,
          borderColor: 'border-r-4 border-r-red-400',
        };
      case ScheduleStatus.InProgress:
        return {
          translate: translate.schedule.status.InProgress,
          borderColor: 'border-r-4 border-r-blue-400',
        };
      case ScheduleStatus.Expired:
        return {
          translate: translate.schedule.status.Expired,
          borderColor: 'border-r-4 border-r-red-400',
        };
      case ScheduleStatus.Signed:
        return {
          translate: translate.schedule.status.Signed,
          borderColor: 'border-r-4 border-r-green-400',
        };
      default:
        return {
          translate: translate.schedule.status.Pending,
          borderColor: 'border-r-4 border-r-yellow-400',
        };
    }
  };

  const classes = getStatusClasses(schedule.statusName);

  return (
    <TouchableOpacity
      className={cn(
        'mb-4 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-300',
        classes.borderColor
      )}
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
