import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';

import { BalanceCard } from './cards/balance-card';
import { BookingCard } from './cards/booking-card';
import { CarCard } from './cards/car-card';
import { ReportCard } from './cards/report-card';
import { ScheduleCard } from './cards/schedule-card';

import { UserResponse } from '~/constants/models/user.model';
import { useHomeQueries } from '~/hooks/home-query';
import { useReportQuery } from '~/hooks/report/use-report';
import { COLORS } from '~/theme/colors';

interface HomeScreenProps {
  user: UserResponse;
}

export const HomeScreen = ({ user }: HomeScreenProps) => {
  const router = useRouter();
  const [isRefetching, setIsRefetching] = React.useState(false);
  const { cars, bookings, schedules, isLoading, refetch } = useHomeQueries();
  const { data: reports } = useReportQuery({ params: { index: 0, size: 3 } });

  const recentBookings = bookings.slice(0, 3);
  const recentCars = cars.slice(0, 3);
  const recentSchedules = schedules.slice(0, 3);
  const recentReports = reports?.value.items || [];

  const handleRefetch = async () => {
    try {
      setIsRefetching(true);
      await refetch();
    } finally {
      setIsRefetching(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500 dark:text-gray-400">Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-50 p-4 dark:bg-slate-800"
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={handleRefetch} />}>
      {/* Balance Section */}
      <BalanceCard user={user} />

      {/* Bookings Section */}
      <View className="mb-6">
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Đơn đặt xe gần đây
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/bookings' as any)}
            className="flex-row items-center">
            <Text className="mr-1 text-sm text-gray-500 dark:text-gray-400">Xem tất cả</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
        {recentBookings.length > 0 ? (
          recentBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
        ) : (
          <View className="items-center justify-center rounded-lg bg-white p-8 dark:bg-slate-300">
            <Ionicons name="calendar-outline" size={32} color={COLORS.gray} />
            <Text className="mt-2 text-center text-gray-500 dark:text-gray-400">
              Chưa có đơn đặt xe nào
            </Text>
          </View>
        )}
      </View>

      {/* Cars Section */}
      <View className="mb-6">
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-lg font-bold text-gray-900 dark:text-gray-100">Xe có sẵn</Text>
          <TouchableOpacity onPress={() => router.push('/cars')} className="flex-row items-center">
            <Text className="mr-1 text-sm text-gray-500 dark:text-gray-400">Xem tất cả</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
        {recentCars.length > 0 ? (
          recentCars.map((car) => <CarCard key={car.id} car={car} />)
        ) : (
          <View className="items-center justify-center rounded-lg bg-white p-8 dark:bg-slate-300">
            <Ionicons name="car-outline" size={32} color={COLORS.gray} />
            <Text className="mt-2 text-center text-gray-500 dark:text-gray-400">
              Chưa có xe nào
            </Text>
          </View>
        )}
      </View>

      {/* Schedules Section */}
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
        {recentSchedules.length > 0 ? (
          recentSchedules.map((schedule) => <ScheduleCard key={schedule.id} schedule={schedule} />)
        ) : (
          <View className="items-center justify-center rounded-lg bg-white p-8 dark:bg-slate-300">
            <Ionicons name="time-outline" size={32} color={COLORS.gray} />
            <Text className="mt-2 text-center text-gray-500 dark:text-gray-400">
              Chưa có lịch kiểm định nào
            </Text>
          </View>
        )}
      </View>

      {/* Reports Section */}
      <View className="mb-6">
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Báo cáo gần đây
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/(third)/book-report')}
            className="flex-row items-center">
            <Text className="mr-1 text-sm text-gray-500 dark:text-gray-400">Xem tất cả</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
        {recentReports.length > 0 ? (
          recentReports.map((report) => <ReportCard key={report.id} report={report} />)
        ) : (
          <View className="items-center justify-center rounded-lg bg-white p-8 dark:bg-slate-300">
            <Ionicons name="document-text-outline" size={32} color={COLORS.gray} />
            <Text className="mt-2 text-center text-gray-500 dark:text-gray-400">
              Chưa có báo cáo nào
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
