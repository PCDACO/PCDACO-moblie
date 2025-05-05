import React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

import LoadingAnimation from '~/components/plugins/loading-animation';
import { BalanceCard } from '~/components/screens/home-screen/cards/balance-card';
// import { BookingCardSkeleton } from '~/components/screens/home-screen/cards/booking-card';
import HomeHeader from '~/components/screens/home-screen/home-header';
import BookSection from '~/components/screens/home-screen/sections/book-section';
import CarSection from '~/components/screens/home-screen/sections/car-section';
import ReportSection from '~/components/screens/home-screen/sections/report-section';
import ScheduleSection from '~/components/screens/home-screen/sections/schedule-section';
// import { BalanceCardSkeleton } from '~/components/screens/home-screen/skeleton/balance-skeleton';
// import { CarCardSkeleton } from '~/components/screens/home-screen/skeleton/car-skeleton';
// import { HeaderSkeleton } from '~/components/screens/home-screen/skeleton/header-skeleton';
// import { ReportCardSkeleton } from '~/components/screens/home-screen/skeleton/report-skeleton';
// import { ScheduleCardSkeleton } from '~/components/screens/home-screen/skeleton/schedule-skeleton';
import { useHomeQueries } from '~/hooks/home-query';

const HomeScreenWrapper = () => {
  const [isRefetching, setIsRefetching] = React.useState(false);
  const { user, cars, bookings, schedules, reports, isLoading, refetch } = useHomeQueries();
  const recentBookings = bookings.slice(0, 3);
  const recentCars = cars.slice(0, 3);
  const recentSchedules = schedules.slice(0, 3);
  const recentReports = reports;

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
      <View className="h-full flex-1 items-center justify-center">
        <LoadingAnimation />
      </View>
    );
  }

  return (
    <View className="h-full flex-1">
      <HomeHeader user={user} />
      <ScrollView
        className="flex-1 bg-gray-50 p-4 dark:bg-slate-800"
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={handleRefetch} />}>
        <View className="gap-6 py-2">
          <BalanceCard user={user} />
          <BookSection recentBookings={recentBookings} />
          <CarSection recentCars={recentCars} />
          <ScheduleSection recentSchedules={recentSchedules} />
          <ReportSection recentReports={recentReports} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreenWrapper;
