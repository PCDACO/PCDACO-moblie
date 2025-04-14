import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import CardContract from '~/components/card/car/contract/card';
import { Button } from '~/components/nativewindui/Button';
import { Text as TextUI } from '~/components/nativewindui/Text';
import { CarContractStatus } from '~/constants/enums';
import { CarDetailResponse } from '~/constants/models/car.model';
import { COLORS } from '~/theme/colors';

interface CarContactProps {
  id: string;
  contract: any;
  carContract: CarDetailResponse['contract'];
  month: number;
  year: number;
}

const CarContact: FunctionComponent<CarContactProps> = ({ id, contract, carContract }) => {
  const handleAssignContract = () => {
    router.push({
      pathname: '/(screen)/(signature)/car/[id]',
      params: {
        id,
      },
    });
  };

  return (
    <View className="relative h-[700px] flex-1">
      {contract ? (
        <View className="flex-1  justify-start gap-4">
          <CardContract contract={carContract} carId={id} />

          <Text className="text-center text-sm text-gray-500">
            Vui lòng nhấn vào thẻ hợp đồng để xem chi tiết hợp đồng
          </Text>
          {carContract.status === CarContractStatus.TechnicianSigned && (
            <Button onPress={handleAssignContract}>
              <TextUI>Nhấn để ký xác nhận</TextUI>
            </Button>
          )}
        </View>
      ) : (
        <View className="flex-1 items-center justify-start gap-2 pt-20">
          <Feather name="alert-circle" size={24} color={COLORS.gray} />
          <Text className="w-60 text-center">
            Hiện tại, bạn chưa có hợp đồng, xin vui lòng theo dõi trong thời gian sắp tới
          </Text>
        </View>
      )}
    </View>
  );
};

export default CarContact;
