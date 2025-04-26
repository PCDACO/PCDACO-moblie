import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

import ReportBadgeStatus from '../../report-list/report-badge-status';

import Skeleton from '~/components/nativewindui/Skeleton';
import { ReportListResponse } from '~/constants/models/report.model';
import { COLORS } from '~/theme/colors';

interface ReportCardProps {
  report: ReportListResponse;
}

const ReportCardSkeleton = () => {
  return (
    <View className="mb-4 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-300">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Skeleton width={128} height={24} />
          <Skeleton width={192} height={16} className="mt-2" />
        </View>
        <Skeleton width={80} height={24} />
      </View>
      <Skeleton width="100%" height={16} className="mt-2" />
      <Skeleton width="75%" height={16} className="mt-2" />
      <View className="mt-2 flex-row items-center">
        <Skeleton width={16} height={16} borderRadius={8} />
        <Skeleton width={96} height={16} className="ml-1" />
      </View>
    </View>
  );
};

export const ReportCard = ({ report }: ReportCardProps) => {
  const router = useRouter();

  if (!report) {
    return <ReportCardSkeleton />;
  }

  return (
    <TouchableOpacity
      className="mb-4 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-300"
      onPress={() =>
        router.push({
          pathname: '/(screen)/(reports)/detail/[id]',
          params: {
            id: report.id,
          },
        })
      }>
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-base font-bold text-gray-900 dark:text-gray-100">
            {report.title}
          </Text>
          <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {report.reporterName}
          </Text>
        </View>
        <ReportBadgeStatus status={report.status} />
      </View>
      <Text className="mt-2 text-sm text-gray-500 dark:text-gray-400" numberOfLines={2}>
        {report.description}
      </Text>
      {report.imageReports?.length > 0 && (
        <View className="mt-2 flex-row items-center">
          <Ionicons name="images-outline" size={16} color={COLORS.gray} />
          <Text className="ml-1 text-sm text-gray-500 dark:text-gray-400">
            {report.imageReports.length} hình ảnh
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
