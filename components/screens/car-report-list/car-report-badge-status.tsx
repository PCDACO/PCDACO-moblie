import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import { CarReportStatusNumber } from '~/constants/enums';
import { cn } from '~/lib/cn';
import { translate } from '~/lib/translate';

interface CarReportBadgeStatusProps {
  status: number;
  className?: string;
  textSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl';
  fontWeight?: 'font-normal' | 'font-medium' | 'font-semibold' | 'font-bold';
}

const CarReportBadgeStatus: FunctionComponent<CarReportBadgeStatusProps> = ({
  status,
  className,
  textSize = 'text-xs',
  fontWeight = 'font-medium',
}) => {
  let badgeText = '';
  let bgColor = '';
  let textColor = '';

  switch (status) {
    case CarReportStatusNumber.Pending:
      badgeText = translate.car_report.status.Pending;
      bgColor = 'bg-yellow-100 dark:bg-yellow-900';
      textColor = 'text-yellow-600 dark:text-yellow-300';
      break;
    case CarReportStatusNumber.UnderReview:
      badgeText = translate.car_report.status.UnderReview;
      bgColor = 'bg-blue-100 dark:bg-blue-900';
      textColor = 'text-blue-600 dark:text-blue-300';
      break;
    case CarReportStatusNumber.Resolved:
      badgeText = translate.car_report.status.Resolved;
      bgColor = 'bg-green-100 dark:bg-green-900';
      textColor = 'text-green-600 dark:text-green-300';
      break;
    case CarReportStatusNumber.Rejected:
      badgeText = translate.car_report.status.Rejected;
      bgColor = 'bg-red-100 dark:bg-red-900';
      textColor = 'text-red-600 dark:text-red-300';
      break;
    default:
      badgeText = translate.car_report.status.Pending;
      bgColor = 'bg-gray-100 dark:bg-gray-900';
      textColor = 'text-gray-600 dark:text-gray-300';
  }

  return (
    <View className={cn(className, 'rounded-full px-2 py-0.5', bgColor)}>
      <Text className={cn('text-center', textSize, fontWeight, textColor)}>{badgeText}</Text>
    </View>
  );
};

export default CarReportBadgeStatus;
