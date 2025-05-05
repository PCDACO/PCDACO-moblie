import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { ScheduleCard } from '../cards/schedule-card';

import { InspectionScheduleReponse } from '~/constants/models/schedule.model';
import { COLORS } from '~/theme/colors';

interface SchedulesSectionProps {
  recentSchedules?: InspectionScheduleReponse[];
}

const ScheduleSection: FunctionComponent<SchedulesSectionProps> = ({ recentSchedules }) => {
  return (
    <View className="mb-6">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-gray-900 dark:text-gray-100">Lịch kiểm định</Text>
        <TouchableOpacity
          onPress={() => router.push('/schedules' as any)}
          className="flex-row items-center">
          <Text className="mr-1 text-sm text-gray-500 dark:text-gray-400">Xem tất cả</Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.gray} />
        </TouchableOpacity>
      </View>
      {recentSchedules!.length > 0 ? (
        recentSchedules!.map((schedule) => <ScheduleCard key={schedule.id} schedule={schedule} />)
      ) : (
        <View className="items-center justify-center rounded-lg bg-white p-8 dark:bg-slate-300">
          <Ionicons name="time-outline" size={32} color={COLORS.gray} />
          <Text className="mt-2 text-center text-gray-500 dark:text-gray-400">
            Chưa có lịch kiểm định nào
          </Text>
        </View>
      )}
    </View>
  );
};

export default ScheduleSection;
