import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

import FieldLayout from '~/components/layouts/field-layout';

interface CarTermProps {
  term: string;
}

const CarTerm: FunctionComponent<CarTermProps> = ({ term }) => {
  return (
    <FieldLayout label="Điều khoản">
      <View className="gap-2 rounded-xl border border-gray-200 p-4 dark:border-gray-800">
        <Text>{term}</Text>
      </View>
    </FieldLayout>
  );
};

export default CarTerm;
