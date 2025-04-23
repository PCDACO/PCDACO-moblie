import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';

import { BalanceCard } from './cards/balance-card';
import { BookingCard } from './cards/booking-card';
import { CarCard } from './cards/car-card';
import { ReportCard } from './cards/report-card';
import { ScheduleCard } from './cards/schedule-card';

import Skeleton from '~/components/nativewindui/Skeleton';
import { UserResponse } from '~/constants/models/user.model';
import { useHomeQueries } from '~/hooks/home-query';
import { useReportQuery } from '~/hooks/report/use-report';
import { COLORS } from '~/theme/colors';

interface HomeScreenProps {
  user: UserResponse;
}

const HomeScreenSkeleton = () => {
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4 dark:bg-slate-800">
      {/* Balance Card Skeleton */}
      <View className="mb-4 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-300">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Skeleton width={120} height={24} />
            <Skeleton width={160} height={32} className="mt-2" />
          </View>
          <Skeleton width={48} height={48} borderRadius={24} />
        </View>
        <View className="mt-4 flex-row justify-between">
          <View className="items-center">
            <Skeleton width={80} height={16} />
            <Skeleton width={48} height={24} className="mt-1" />
          </View>
          <View className="items-center">
            <Skeleton width={80} height={16} />
            <Skeleton width={48} height={24} className="mt-1" />
          </View>
          <View className="items-center">
            <Skeleton width={80} height={16} />
            <Skeleton width={48} height={24} className="mt-1" />
          </View>
        </View>
      </View>

      {/* Bookings Section Skeleton */}
      <View className="mb-6">
        <View className="mb-4 flex-row items-center justify-between">
          <Skeleton width={160} height={24} />
          <Skeleton width={96} height={24} />
        </View>
        {[1, 2, 3].map((i) => (
          <View key={i} className="mb-4 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-300">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Skeleton width={128} height={24} />
                <Skeleton width={192} height={16} className="mt-2" />
              </View>
              <Skeleton width={80} height={24} />
            </View>
            <View className="mt-2 flex-row items-center">
              <Skeleton width={16} height={16} borderRadius={8} />
              <Skeleton width={128} height={16} className="ml-1" />
            </View>
          </View>
        ))}
      </View>

      {/* Cars Section Skeleton */}
      <View className="mb-6">
        <View className="mb-4 flex-row items-center justify-between">
          <Skeleton width={128} height={24} />
          <Skeleton width={96} height={24} />
        </View>
        {[1, 2, 3].map((i) => (
          <View key={i} className="mb-4 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-300">
            <View className="flex-row">
              <Skeleton width={80} height={80} className="mr-4 rounded-lg" />
              <View className="flex-1">
                <Skeleton width={128} height={24} />
                <Skeleton width={192} height={16} className="mt-2" />
                <View className="mt-2 flex-row items-center">
                  <Skeleton width={16} height={16} borderRadius={8} />
                  <Skeleton width={128} height={16} className="ml-1" />
                </View>
                <View className="mt-1 flex-row items-center">
                  <Skeleton width={16} height={16} borderRadius={8} />
                  <Skeleton width={96} height={16} className="ml-1" />
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Schedules Section Skeleton */}
      <View className="mb-6">
        <View className="mb-4 flex-row items-center justify-between">
          <Skeleton width={160} height={24} />
          <Skeleton width={96} height={24} />
        </View>
        {[1, 2, 3].map((i) => (
          <View key={i} className="mb-4 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-300">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Skeleton width={128} height={24} />
                <Skeleton width={192} height={16} className="mt-2" />
              </View>
              <Skeleton width={80} height={24} />
            </View>
            <View className="mt-2 flex-row items-center">
              <Skeleton width={16} height={16} borderRadius={8} />
              <Skeleton width={128} height={16} className="ml-1" />
            </View>
          </View>
        ))}
      </View>

      {/* Reports Section Skeleton */}
      <View className="mb-6">
        <View className="mb-4 flex-row items-center justify-between">
          <Skeleton width={160} height={24} />
          <Skeleton width={96} height={24} />
        </View>
        {[1, 2, 3].map((i) => (
          <View key={i} className="mb-4 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-300">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Skeleton width={128} height={24} />
                <Skeleton width={192} height={16} className="mt-2" />
              </View>
              <Skeleton width={80} height={24} />
            </View>
            <Skeleton width="100%" height={16} className="mt-2" />
            <Skeleton width="75%" height={16} className="mt-2" />
            <View className="mt-2 flex-row items-center">
              <Skeleton width={16} height={16} borderRadius={8} />
              <Skeleton width={96} height={16} className="ml-1" />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

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
    return <HomeScreenSkeleton />;
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
