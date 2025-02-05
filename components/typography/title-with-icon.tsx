import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

import { cn } from '~/lib/utils';

interface TitleWithIconProps {
  title: string;
  icon: LucideIcon;
  className?: string;
  iconColor?: string;
  weight?: 'bold' | 'normal';
  iconSize?: number;

  titleClassName?: string;
  iconClassName?: string;
}

const TitleWithIcon: React.FC<TitleWithIconProps> = ({
  title,
  icon: Icon,
  className,
  iconColor = 'black',
  weight = 'normal',
  iconSize = 20,

  titleClassName,
  iconClassName,
}) => {
  return (
    <View className={cn('flex-row items-center gap-2', className)}>
      <Icon size={iconSize} color={iconColor} className={cn(iconClassName)} />
      <Text className={cn(weight === 'bold' ? 'text-lg font-bold' : 'text-lg', titleClassName)}>
        {title}
      </Text>
    </View>
  );
};

export default TitleWithIcon;
