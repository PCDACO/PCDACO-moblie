import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import Markdown from 'react-native-markdown-display';

import FieldLayout from '~/components/layouts/field-layout';

interface CarDescriptionProps {
  description: string;
  // requiresCollateral: boolean;
}

const CarDescription: FunctionComponent<CarDescriptionProps> = ({
  description,
  // requiresCollateral,
}) => {
  return (
    <FieldLayout label="Mô tả" className="gap-2">
      <View className="gap-2 rounded-xl border border-gray-200 p-4 dark:border-gray-800">
        <Markdown>{description}</Markdown>
      </View>
    </FieldLayout>
  );
};

export default CarDescription;
