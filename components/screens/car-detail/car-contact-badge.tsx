import React from 'react';
import { Text, View } from 'react-native';

import { CarContractStatus } from '~/constants/enums';
import { cn } from '~/lib/cn';
import { translate } from '~/lib/translate';

interface CarContactBadgeProps {
  status: string;
  className?: string;
  textSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl';
  fontWeight?: 'font-normal' | 'font-medium' | 'font-semibold' | 'font-bold';
}

const CarContactBadge: React.FC<CarContactBadgeProps> = ({
  status,
  className,
  textSize,
  fontWeight,
}) => {
  let badgeText = '';
  let bgClass = '';
  let textClass = '';

  switch (status) {
    case CarContractStatus.Pending:
      badgeText = translate.cars.status.contract.pending;
      bgClass = 'bg-blue-100 dark:bg-blue-900';
      textClass = 'text-blue-600 dark:text-blue-300';
      break;
    case CarContractStatus.OwnerSigned:
      badgeText = translate.cars.status.contract.owner_signed;
      bgClass = 'bg-green-100 dark:bg-green-900';
      textClass = 'text-green-600 dark:text-green-300';
      break;
    case CarContractStatus.TechnicianSigned:
      badgeText = translate.cars.status.contract.technician_signed;
      bgClass = 'bg-yellow-100 dark:bg-yellow-900';
      textClass = 'text-yellow-600 dark:text-yellow-300';
      break;
    case CarContractStatus.Completed:
      badgeText = translate.cars.status.contract.completed;
      bgClass = 'bg-green-100 dark:bg-green-900';
      textClass = 'text-green-600 dark:text-green-300';
      break;
    case CarContractStatus.Rejected:
      badgeText = translate.cars.status.contract.rejected;
      bgClass = 'bg-red-100 dark:bg-red-900';
      textClass = 'text-red-600 dark:text-red-300';
      break;
    default:
      badgeText = translate.cars.status.contract.pending;
      bgClass = 'bg-blue-100 dark:bg-blue-900';
      textClass = 'text-blue-600 dark:text-blue-300';
      break;
  }
  return (
    <View className={cn(className, 'rounded-full px-2 py-0.5', bgClass, className)}>
      <Text className={cn(textSize, fontWeight, textClass)}>{badgeText}</Text>
    </View>
  );
};
export default CarContactBadge;
