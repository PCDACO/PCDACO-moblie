import { useLocalSearchParams } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { ToastAndroid, View } from 'react-native';

import InputSignature from '~/components/plugins/input-signature';
import { useApproveOrRejectBooking } from '~/hooks/book/use-approve-or-reject-booking';

const BookingSignatureScreen: FunctionComponent = () => {
  const { id } = useLocalSearchParams();
  const [signature, setSignature] = React.useState<string>();
  const { handleApproveOrRejectBooking, isLoading } = useApproveOrRejectBooking({
    id: id as string,
  });

  return (
    <View className="flex-1 p-4">
      <InputSignature
        title="Chữ ký của bạn"
        isLoading={isLoading}
        onChange={(signature) => {
          setSignature(signature);
        }}
        onSubmit={() => {
          if (signature) {
            handleApproveOrRejectBooking(true, signature);
          } else {
            ToastAndroid.show('Vui lòng ký tên trước khi xác nhận', ToastAndroid.SHORT);
          }
        }}
        onClear={() => {
          setSignature('');
        }}
      />
    </View>
  );
};

export default BookingSignatureScreen;
