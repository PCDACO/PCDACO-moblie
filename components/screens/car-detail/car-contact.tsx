import { Feather } from '@expo/vector-icons';
import { FunctionComponent } from 'react';
import { Text, ToastAndroid, View } from 'react-native';

import CardContract from '~/components/card/car/contract/card';
import { Button } from '~/components/nativewindui/Button';
import { Text as TextUI } from '~/components/nativewindui/Text';
import { CarContractStatus } from '~/constants/enums';
import { CarDetailResponse } from '~/constants/models/car.model';
import { useCarMutation } from '~/hooks/car/use-car';
import { COLORS } from '~/theme/colors';

interface CarContactProps {
  id: string;
  contract: any;
  carContract: CarDetailResponse['contract'];
}

const CarContact: FunctionComponent<CarContactProps> = ({ id, contract, carContract }) => {
  const { postAssignContractMutation } = useCarMutation();

  const handleAssignContract = () => {
    postAssignContractMutation.mutate(carContract.id, {
      onSuccess: () => {
        ToastAndroid.show('Đã ký xác nhận', ToastAndroid.SHORT);
      },
      onError: () => {
        ToastAndroid.show('Ký xác nhận thất bại', ToastAndroid.SHORT);
      },
    });
  };

  return (
    <View className="relative h-[700px]">
      {contract ? (
        <View className="flex-1  justify-start gap-2">
          <CardContract contract={carContract} carId={id} />

          <Text className="text-center text-sm text-gray-500">
            Vui lòng nhấn vào thẻ hợp đồng để xem chi tiết hợp đồng
          </Text>
        </View>
      ) : (
        <View className="flex-1 items-center justify-start gap-2 pt-20">
          <Feather name="alert-circle" size={24} color={COLORS.gray} />
          <Text className="w-60 text-center">
            Hiện tại, bạn chưa có hợp đồng, xin vui lòng theo dõi trong thời gian sắp tới
          </Text>
        </View>
      )}

      {contract && carContract.status === CarContractStatus.Pending && (
        <View className="absolute bottom-4 left-0 right-0 z-20 px-4">
          <Button onPress={handleAssignContract}>
            <TextUI>Ký xác nhận</TextUI>
          </Button>
        </View>
      )}
    </View>
  );
};

export default CarContact;
