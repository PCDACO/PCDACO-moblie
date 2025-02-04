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
}

const TitleWithIcon: React.FC<TitleWithIconProps> = ({
  title,
  icon: Icon,
  className,
  iconColor = 'black',
  weight = 'normal',
  iconSize = 20,
}) => {
  return (
    <View className={cn('flex-row items-center gap-2', className)}>
      <Icon size={iconSize} color={iconColor} />
      <Text className={weight === 'bold' ? 'text-lg font-bold' : 'text-lg'}>{title}</Text>
    </View>
  );
};

export default TitleWithIcon;
