import { useLocalSearchParams } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import Loading from '~/components/plugins/loading';
import ScheduleCarInfo from '~/components/screens/schedule-detail/schedule-car-info';
import ScheduleInfo from '~/components/screens/schedule-detail/schedule-info';
import { useScheduleDetailQuery } from '~/hooks/schedule/use-schedule';

const ScheduleDetailScreen: FunctionComponent = () => {
  const { id } = useLocalSearchParams();

  const { data: inspectionSchedule, isLoading } = useScheduleDetailQuery(id as string);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className="gap-4 px-2 py-4">
      <ScheduleInfo
        address={inspectionSchedule?.value.address}
        date={inspectionSchedule?.value.date}
        note={inspectionSchedule?.value.notes}
        technician={inspectionSchedule?.value.technician}
        createdAt={inspectionSchedule?.value.createdAt}
      />
      <ScheduleCarInfo car={inspectionSchedule?.value.car} />
    </View>
  );
};

export default ScheduleDetailScreen;
