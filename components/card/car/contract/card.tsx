import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FunctionComponent } from 'react';
import { View } from 'react-native';

import CardBasic from '~/components/plugins/card-basic';
import CarContactBadge from '~/components/screens/car-detail/car-contact-badge';
import Description from '~/components/screens/car-editor/description';
import Subtitle from '~/components/screens/car-editor/subtitle';
import { CarContractStatus } from '~/constants/enums';
import { CarDetailResponse } from '~/constants/models/car.model';
import { cn } from '~/lib/cn';
import { DateFormat, formatDateToString } from '~/lib/format';
import { COLORS } from '~/theme/colors';

interface CardContractProps {
  contract: CarDetailResponse['contract'];
  carId: string;
}

const CardContract: FunctionComponent<CardContractProps> = ({ contract, carId }) => {
  let borderRColor = '';
  switch (contract.status) {
    case CarContractStatus.Pending:
      borderRColor = 'border-l-blue-500';
      break;
    case CarContractStatus.OwnerSigned:
      borderRColor = 'border-l-green-500';
      break;
    case CarContractStatus.TechnicianSigned:
      borderRColor = 'border-l-yellow-500';
      break;
    case CarContractStatus.Completed:
      borderRColor = 'border-l-green-500';
      break;
    case CarContractStatus.Rejected:
      borderRColor = 'border-l-red-500';
      break;
    default:
      borderRColor = 'border-l-blue-500';
      break;
  }

  return (
    <CardBasic
      className={cn('gap-4 border-l-4', borderRColor)}
      onPress={() => {
        router.push({
          pathname: '/cars/contract',
          params: { id: carId },
        });
      }}>
      <View className="flex-row items-start justify-between gap-4">
        <View className="gap-0.5">
          <Subtitle title="Thông tin hợp đồng" />
          <Description title={`Mã hợp đồng: ${contract.id.slice(0, 8).toUpperCase()}`} />
        </View>
        <CarContactBadge status={contract.status} />
      </View>
      <View className="h-0.5 bg-gray-200" />
      <View className="items-start justify-between gap-2">
        <View className="gap-0.5">
          <Description className="text-base text-gray-400" title="Thời điểm chủ xe ký" />
          <Description
            className="font-bold text-black "
            title={`${formatDateToString(new Date(contract.ownerSignatureDate), DateFormat.DayTime)}`}
          />
        </View>
        <View className="gap-0.5">
          <Description className="text-base text-gray-400" title="Thời điểm kỹ thuật viên ký" />
          <Description
            className="font-bold text-black "
            title={`${formatDateToString(new Date(contract.technicianSignatureDate), DateFormat.DayTime)}`}
          />
        </View>
      </View>
      <View className="h-0.5 bg-gray-200" />
      <View>
        <View className="flex-row items-center gap-2">
          <Feather name="map-pin" size={14} color={COLORS.gray} />
          <Description className="text-base text-gray-400" title="Mã số của thiết bị GPS" />
        </View>
        <Description
          className="font-bold text-black "
          title={contract.gpsDeviceId?.slice(0, 8).toUpperCase() || ''}
        />
      </View>
    </CardBasic>
  );
};

export default CardContract;
