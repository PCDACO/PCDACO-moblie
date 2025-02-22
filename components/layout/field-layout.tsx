import React from 'react';
import { Text, View } from 'react-native';

import Title from '../typography/title';

import { cn } from '~/lib/utils';

interface FieldLayoutProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
  required?: boolean;
}

const FieldLayout: React.FC<FieldLayoutProps> = ({ children, label, required, className }) => {
  return (
    <View className={cn('gap-2', className)}>
      {label && (
        <View className="flex-row gap-1">
          <Title size="md" title={label} />
          <Text className="text-xl text-destructive">{required ? ' *' : ''}</Text>
        </View>
      )}
      <View>{children}</View>
    </View>
  );
};

export default FieldLayout;
