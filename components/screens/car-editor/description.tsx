import { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import { cn } from '~/lib/cn';

interface DescriptionProps {
  title: string;
  className?: string;
}

const Description: FunctionComponent<DescriptionProps> = ({ title, className }) => {
  return (
    <View>
      <Text className={cn('text-base text-gray-500', className)}>{title}</Text>
    </View>
  );
};

export default Description;
