import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import { useCarForm } from '~/hooks/car/use-car-form';

interface CarPreviewProps {
  form: ReturnType<typeof useCarForm>['form'];
}

const CarPreview: FunctionComponent<CarPreviewProps> = ({ form }) => {
  return (
    <View>
      <Text>Car Preview</Text>
    </View>
  );
};

export default CarPreview;
