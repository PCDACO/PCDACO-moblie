import React from 'react';
import { Text, View } from 'react-native';

import { cn } from '~/lib/utils';

interface TitleProps {
  title: string;
  className?: string;
  size?: Size;
}

const Title: React.FC<TitleProps> = ({ title, className, size = 'md' }) => {
  const sizeTitle = (size: Size) => {
    switch (size) {
      case 'sm':
        return 'text-base';
      case 'md':
        return 'text-lg';
      case 'lg':
        return 'text-xl';
      case 'xl':
        return 'text-2xl';
    }
  };

  return (
    <View>
      <Text className={cn(`font-bold ${sizeTitle(size)}`, className)}>{title}</Text>
    </View>
  );
};

export default Title;
