import React from 'react';
import { View } from 'react-native';

import Title from '../typography/title';
import { cn } from '~/lib/utils';

interface FieldLayoutProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
}

const FieldLayout: React.FC<FieldLayoutProps> = ({ children, label, className }) => {
  return (
    <View className={cn('gap-2', className)}>
      {label && <Title title={label} />}
      <View>{children}</View>
    </View>
  );
};

export default FieldLayout;
