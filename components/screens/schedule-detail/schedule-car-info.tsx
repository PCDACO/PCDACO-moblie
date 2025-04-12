import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import Description from '../car-editor/description';
import Subtitle from '../car-editor/subtitle';

import CardBasic from '~/components/plugins/card-basic';
import { InspectionScheduleDetailResponse } from '~/constants/models/schedule.model';
import { COLORS } from '~/theme/colors';

interface ScheduleCarInfoProps {
  car?: InspectionScheduleDetailResponse['car'];
}

const ScheduleCarInfo: FunctionComponent<ScheduleCarInfoProps> = ({ car }) => {
  return (
    <CardBasic
      className="gap-4"
      onPress={() => {
        router.push({
          pathname: '/cars/detail/[id]',
          params: { id: car?.id || '' },
        });
      }}>
      <Subtitle title="Thông tin xe" />
      <View className="flex-row items-start gap-4">
        <View className="items-center justify-center rounded-full border border-gray-300 bg-gray-100 p-2 dark:bg-gray-800">
          <MaterialCommunityIcons name="car-sports" size={24} color={COLORS.gray} />
        </View>
        <View className="gap-1">
          <Description
            title={car?.modelName || 'Không có thông tin'}
            className="font-bold text-foreground"
          />

          <View className="flex-row items-center gap-2">
            <Badge title={car?.fuelType || 'Không có thông tin'} />
            <Badge title={car?.transmissionType || 'Không có thông tin'} />
          </View>
        </View>
      </View>
    </CardBasic>
  );
};

export default ScheduleCarInfo;

interface BadgeProps {
  title: string;
}

const Badge: FunctionComponent<BadgeProps> = ({ title }) => {
  return (
    <View className="flex-row items-center justify-center gap-2 rounded-full border border-gray-300 px-4 py-1">
      <Text className="text-sm text-foreground">{title}</Text>
    </View>
  );
};
