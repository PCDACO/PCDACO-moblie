import { useLocalSearchParams } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import InputSignature from '~/components/plugins/input-signature';
import { useContractForm } from '~/hooks/contact/use-contact-form';

const CarSignatureScreen: FunctionComponent = () => {
  const { id } = useLocalSearchParams();

  const { form, onSubmit } = useContractForm(id as string);

  return (
    <View className="flex-1 p-4">
      <InputSignature
        title="Chữ ký của bạn"
        onChange={(signature) => {
          form.setValue('signature', signature);
        }}
        onSubmit={onSubmit}
        onClear={() => {
          form.setValue('signature', '');
        }}
      />
    </View>
  );
};

export default CarSignatureScreen;
