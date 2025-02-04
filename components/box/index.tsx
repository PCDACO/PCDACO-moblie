import React from 'react';
import { View } from 'react-native';

import { cn } from '~/lib/utils';

interface BoxProps {
  children?: React.ReactNode;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <View className={cn('gap-8 border border-gray-400 bg-background p-4', className)}>
      {children}
    </View>
  );
};

export default Box;
