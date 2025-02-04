import React from 'react';
import { View } from 'react-native';

import { cn } from '~/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <View className={cn('rounded-lg bg-background p-4 shadow-md', className)}>{children}</View>
  );
};

export default Card;
