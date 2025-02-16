import React from 'react';
import { View } from 'react-native';

import Title from '../typography/title';

interface FieldLayoutProps {
  children: React.ReactNode;
  label?: string;
}

const FieldLayout: React.FC<FieldLayoutProps> = ({ children, label }) => {
  return (
    <View className="gap-2">
      {label && <Title title={label} />}
      <View>{children}</View>
    </View>
  );
};

export default FieldLayout;
