import React from 'react';
import { Text, View } from 'react-native';
import ModelPicker from '../modal-picker';
import FieldLayout from '../layout/field-layout';

import { PlusCircle } from '~/lib/icons/icon';

const SecondInfoCar = () => {
  return (
    <View>
      <FieldLayout label="Tiện ích xe">
        <ModelPicker icon={PlusCircle} variant="ghost" title="Tiện ích xe" label="Lựa chọn" />
      </FieldLayout>
    </View>
  );
};

export default SecondInfoCar;
