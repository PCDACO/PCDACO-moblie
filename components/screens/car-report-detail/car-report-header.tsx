import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';

import CarReportBadgeStatus from '../car-report-list/car-report-badge-status';

interface ReportHeaderProps {
  id: string;
  status: number;
  reporterName: string;
  reporterRole: string;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ id, status, reporterName, reporterRole }) => {
  return (
    <View className="border-b border-gray-200 bg-white p-4">
      <View className="flex-row items-center justify-between">
        <CarReportBadgeStatus status={status} textSize="text-sm" fontWeight="font-semibold" />
      </View>
      <View className="mt-2 flex-row items-center">
        <MaterialCommunityIcons name="account" size={18} color="#6b7280" />
        <Text className="ml-2 text-gray-600">
          {reporterName} ({reporterRole})
        </Text>
      </View>
    </View>
  );
};

export default ReportHeader;
