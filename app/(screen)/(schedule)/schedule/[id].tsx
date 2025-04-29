import { useLocalSearchParams } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

import ScheduleCarInfo from '~/components/screens/schedule-detail/schedule-car-info';
import ScheduleDetailSkeleton from '~/components/screens/schedule-detail/schedule-detail-skeleton';
import ScheduleInfo from '~/components/screens/schedule-detail/schedule-info';
import SchedulePhoto from '~/components/screens/schedule-detail/schedule-photo';
import { useScheduleDetailQuery } from '~/hooks/schedule/use-schedule';

const ScheduleDetailScreen: FunctionComponent = () => {
  const { id } = useLocalSearchParams();
  const [isRefetching, setIsRefetching] = React.useState<boolean>(false);

  const { data: inspectionSchedule, isLoading, refetch } = useScheduleDetailQuery(id as string);

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
      <ScrollView>
        <ScheduleDetailSkeleton />
      </ScrollView>
    );
  }

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={handleRefetch} />}>
      <View className="gap-4 px-2 py-4">
        <ScheduleInfo
          address={inspectionSchedule?.value.address}
          date={inspectionSchedule?.value.date}
          note={inspectionSchedule?.value.notes}
          technician={inspectionSchedule?.value.technician}
          createdAt={inspectionSchedule?.value.createdAt}
          status={inspectionSchedule?.value.status}
          type={inspectionSchedule?.value.type}
        />
        <ScheduleCarInfo car={inspectionSchedule?.value.car} />
        <SchedulePhoto photo={inspectionSchedule?.value.photos} />
      </View>
    </ScrollView>
  );
};

export default ScheduleDetailScreen;
