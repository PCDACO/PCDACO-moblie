import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import { cn } from '~/lib/cn';

interface CardShadowProps {
  children: React.ReactNode;
  className?: string;
}

const CardShadow: FunctionComponent<CardShadowProps> = ({ children, className }) => {
  return (
    <View
      className={cn(
        'rounded-lg border border-gray-200 bg-white p-4 shadow-md shadow-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-800',
        className
      )}>
      {children}
    </View>
  );
};

export default CardShadow;
