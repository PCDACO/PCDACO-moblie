import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import { CarStatus } from '~/constants/enums';
import { cn } from '~/lib/cn';
import { translate } from '~/lib/translate';

interface CarStatusBadgeProps {
  status: string;
  className?: string;
  textSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl';
  fontWeight?: 'font-normal' | 'font-medium' | 'font-semibold' | 'font-bold';
}

const CarStatusBadge: FunctionComponent<CarStatusBadgeProps> = ({
  status,
  className,
  textSize = 'text-xs',
  fontWeight = 'font-medium',
}) => {
  let badgeText = '';
  let bgClass = '';
  let textClass = '';

  switch (status) {
    case CarStatus.Pending:
      badgeText = translate.cars.status.pending;
      bgClass = 'bg-blue-100 dark:bg-blue-900';
      textClass = 'text-blue-600 dark:text-blue-300';
      break;
    case CarStatus.Available:
      badgeText = translate.cars.status.available;
      bgClass = 'bg-green-100 dark:bg-green-900';
      textClass = 'text-green-600 dark:text-green-300';
      break;
    case CarStatus.Rented:
      badgeText = translate.cars.status.rented;
      bgClass = 'bg-yellow-100 dark:bg-yellow-900';
      textClass = 'text-yellow-600 dark:text-yellow-300';
      break;
    case CarStatus.Maintain:
      badgeText = translate.cars.status.maintain;
      bgClass = 'bg-purple-100 dark:bg-purple-900';
      textClass = 'text-purple-600 dark:text-purple-300';
      break;
    case CarStatus.Inactive:
      badgeText = translate.cars.status.inactive;
      bgClass = 'bg-gray-100 dark:bg-gray-900';
      textClass = 'text-gray-600 dark:text-gray-300';
      break;
    default:
      badgeText = translate.cars.status.inactive;
      bgClass = 'bg-red-100 dark:bg-red-900';
      textClass = 'text-red-600 dark:text-red-300';
  }

  return (
    <View className={cn(className, 'rounded-full px-2 py-0.5', bgClass)}>
      <Text className={cn(textSize, fontWeight, textClass)}>{badgeText}</Text>
    </View>
  );
};

export default CarStatusBadge;
