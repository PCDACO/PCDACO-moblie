import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Image } from 'react-native';

import CardBasic from '~/components/plugins/card-basic';
import Subtitle from '~/components/screens/car-editor/subtitle';
import CarReportBadgeStatus from '~/components/screens/car-report-list/car-report-badge-status';
import CarReportBadgeType from '~/components/screens/car-report-list/car-report-badge-type';
import { CarReportStatusNumber } from '~/constants/enums';
import { CarReportListReponse } from '~/constants/models/car-report.model';
import { cn } from '~/lib/cn';
import { COLORS } from '~/theme/colors';

interface CarReportCardProps {
  report: CarReportListReponse;
}

const CarReportCard: React.FC<CarReportCardProps> = ({ report }) => {
  const router = useRouter();

  let borderColor = '';

  switch (Number(report.status)) {
    case CarReportStatusNumber.Pending:
      borderColor = 'border-l-amber-500 dark:border-l-amber-900';
      break;
    case CarReportStatusNumber.Resolved:
      borderColor = 'border-l-green-500 dark:border-l-green-900';
      break;
    case CarReportStatusNumber.Rejected:
      borderColor = 'border-l-red-500 dark:border-l-red-900';
      break;
    default:
      borderColor = 'border-l-gray-500 dark:border-l-gray-900';
  }

  return (
    <CardBasic
      className={cn('gap-2 border-l-4', borderColor)}
      onPress={() => {
        router.push({
          pathname: '/(screen)/(reports)/car-detail/[id]',
          params: { id: report.id },
        });
      }}>
      <View className="flex-row items-start justify-between">
        <View className="items-start gap-1">
          <Subtitle title={report.title} />
          <CarReportBadgeType type={Number(report.reportType)} />
        </View>
        <CarReportBadgeStatus status={Number(report.status)} />
      </View>
      <View className="h-0.5 bg-gray-200 dark:bg-gray-700" />

      <View className="flex-row items-center gap-2">
        <Feather name="user" size={16} color={COLORS.gray} />
        <Text className="text-sm text-gray-600 dark:text-gray-300">{report.reporterName}</Text>
      </View>

      <Text className="text-sm text-black dark:text-white" numberOfLines={2}>
        {report.description}
      </Text>

      {report.imageReports && report.imageReports.length > 0 && (
        <View className="mt-2">
          <Image
            source={{ uri: report.imageReports[0] }}
            className="h-32 w-full rounded-lg"
            resizeMode="cover"
          />
        </View>
      )}
    </CardBasic>
  );
};

export default CarReportCard;
