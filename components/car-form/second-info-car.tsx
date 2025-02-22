import React from 'react';
import { View } from 'react-native';

import AmenitiesList from './amenities-list';
import ModalCharactersic from './modal-charactersic';
import FieldLayout from '../layout/field-layout';
import { useCarForm } from '~/hooks/car/use-car-form';

interface SecondInfoCarProps {
  form: ReturnType<typeof useCarForm>['form'];
}

const SecondInfoCar: React.FC<SecondInfoCarProps> = ({ form }) => {
  return (
    <View className="gap-4">
      <FieldLayout label="Các đặc điểm xe">
        <ModalCharactersic form={form} />
      </FieldLayout>
      <FieldLayout label="Các tiện ích khác">
        <AmenitiesList form={form} />
      </FieldLayout>
    </View>
  );
};

export default SecondInfoCar;
