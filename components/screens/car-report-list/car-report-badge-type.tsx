import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import { CarReportTypeNumber } from '~/constants/enums';
import { cn } from '~/lib/cn';
import { translate } from '~/lib/translate';

interface CarReportBadgeTypeProps {
  type: number;
  className?: string;
  textSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl';
  fontWeight?: 'font-normal' | 'font-medium' | 'font-semibold' | 'font-bold';
}

const CarReportBadgeType: FunctionComponent<CarReportBadgeTypeProps> = ({
  type,
  className,
  textSize = 'text-xs',
  fontWeight = 'font-medium',
}) => {
  let typeBadgeText = '';
  let typeBgClass = '';
  let typeTextClass = '';

  switch (type) {
    case CarReportTypeNumber.ChangeGPS:
      typeBadgeText = translate.car_report.type.ChangeGPS;
      typeBgClass = 'bg-amber-100 dark:bg-amber-900';
      typeTextClass = 'text-amber-600 dark:text-amber-300';
      break;
    case CarReportTypeNumber.DeactivateCar:
      typeBadgeText = translate.car_report.type.DeactivateCar;
      typeBgClass = 'bg-red-100 dark:bg-red-900';
      typeTextClass = 'text-red-600 dark:text-red-300';
      break;
    case CarReportTypeNumber.Other:
      typeBadgeText = translate.car_report.type.Other;
      typeBgClass = 'bg-gray-100 dark:bg-gray-900';
      typeTextClass = 'text-gray-600 dark:text-gray-300';
      break;
    default:
      typeBadgeText = translate.car_report.type.Other;
      typeBgClass = 'bg-gray-100 dark:bg-gray-900';
      typeTextClass = 'text-gray-600 dark:text-gray-300';
  }

  return (
    <View className={cn('rounded-full px-2 py-0.5', className, typeBgClass)}>
      <Text className={cn('text-center', textSize, fontWeight, typeTextClass)}>
        {typeBadgeText}
      </Text>
    </View>
  );
};

export default CarReportBadgeType;
