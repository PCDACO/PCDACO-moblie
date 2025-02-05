import React from 'react';
import { Text, View } from 'react-native';

import { cn } from '~/lib/utils';

interface TitleProps {
  title: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ title, className }) => {
  return (
    <View>
      <Text className={cn('text-2xl font-semibold', className)}>{title}</Text>
    </View>
  );
};

export default Title;
