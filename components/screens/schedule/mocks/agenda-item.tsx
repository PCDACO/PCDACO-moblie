import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import ScheduleBadge from '../schedule-bagde';

import CardBasic from '~/components/plugins/card-basic';
import { ScheduleStatus } from '~/constants/enums';
import { InspectionScheduleReponse } from '~/constants/models/schedule.model';
import { cn } from '~/lib/cn';
import { COLORS } from '~/theme/colors';

interface ItemProps {
  inspectionSchedule: InspectionScheduleReponse;
}

const AgendaItem = ({ inspectionSchedule }: ItemProps) => {
  const inspectionDate = inspectionSchedule.inspectionDate
    ? new Date(inspectionSchedule.inspectionDate)
    : null;

  const getBorderColorClass = (status: string) => {
    switch (status) {
      case ScheduleStatus.Pending:
        return 'border-l-4 border-l-yellow-500';
      case ScheduleStatus.Approved:
        return 'border-l-4 border-l-green-500';
      case ScheduleStatus.Rejected:
        return 'border-l-4 border-l-red-500';
      case ScheduleStatus.InProgress:
        return 'border-l-4 border-l-yellow-500';
      case ScheduleStatus.Expired:
        return 'border-l-4 border-l-red-500';
      case ScheduleStatus.Signed:
        return 'border-l-4 border-l-green-500';
      default:
        return 'border-l-4 border-l-blue-500';
    }
  };

  return (
    <CardBasic
      className={cn(
        'gap-4 rounded-lg bg-white p-3',
        getBorderColorClass(inspectionSchedule.statusName)
      )}>
      <View className=" flex-row items-start justify-between">
        <View className="gap-2">
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="calendar"
              size={20}
              color={COLORS.gray}
              className="mr-2"
            />
            <Text className="text-sm font-medium text-gray-900">
              {inspectionDate?.toLocaleDateString()}{' '}
              {inspectionDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={20}
              color={COLORS.gray}
              className="mr-2"
            />
            <Text className="w-60 text-sm text-gray-700" numberOfLines={1}>
              {inspectionSchedule.inspectionAddress}
            </Text>
          </View>
        </View>
        <ScheduleBadge statusName={inspectionSchedule.statusName} />
      </View>

      <View className="">
        <View className="flex-row justify-between">
          <View className="flex-1">
            <Text className="text-xs text-gray-500">Kỹ thuật viên:</Text>
            <Text className="text-sm text-gray-900">{inspectionSchedule.technicianName}</Text>
          </View>

          <View className="flex-1">
            <Text className="text-xs text-gray-500">Chủ xe:</Text>
            <Text className="text-sm text-gray-900">{inspectionSchedule.carOwnerName}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        className="self-end"
        onPress={() =>
          router.push({
            pathname: '/(screen)/(schedule)/schedule/[id]',
            params: { id: inspectionSchedule.id },
          })
        }>
        <Text className="text-sm text-blue-600">Xem chi tiết →</Text>
      </TouchableOpacity>
    </CardBasic>
  );
};

export default React.memo(AgendaItem);
