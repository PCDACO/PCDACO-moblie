import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { ReportCard } from '../cards/report-card';

import { ReportListResponse } from '~/constants/models/report.model';
import { COLORS } from '~/theme/colors';

interface ReportSectionProps {
  recentReports?: ReportListResponse[];
}

const ReportSection: FunctionComponent<ReportSectionProps> = ({ recentReports }) => {
  return (
    <View className="mb-6">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-gray-900 dark:text-gray-100">Báo cáo gần đây</Text>
        <TouchableOpacity
          onPress={() => router.push('/(third)/book-report')}
          className="flex-row items-center">
          <Text className="mr-1 text-sm text-gray-500 dark:text-gray-400">Xem tất cả</Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.gray} />
        </TouchableOpacity>
      </View>
      {recentReports!.length > 0 ? (
        recentReports!.map((report) => <ReportCard key={report.id} report={report} />)
      ) : (
        <View className="items-center justify-center rounded-lg bg-white p-8 dark:bg-slate-300">
          <Ionicons name="document-text-outline" size={32} color={COLORS.gray} />
          <Text className="mt-2 text-center text-gray-500 dark:text-gray-400">
            Chưa có báo cáo nào
          </Text>
        </View>
      )}
    </View>
  );
};

export default ReportSection;
