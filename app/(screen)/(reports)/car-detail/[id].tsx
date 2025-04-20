import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';

import BookingsListCard from '~/components/screens/car-report-detail/booking-list-card';
import ReportHeader from '~/components/screens/car-report-detail/car-report-header';
import CarInfoCard from '~/components/screens/car-report-detail/car-report-inro-card';
import InspectionScheduleCard from '~/components/screens/car-report-detail/inspection-schedule-card';
import ReportDetailsCard from '~/components/screens/car-report-detail/report-detail-card';
import ResolutionCard from '~/components/screens/car-report-detail/resolution';
import { useCarReportDetailQuery } from '~/hooks/car-report/use-car-report';

export default function CarDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: carReport, isLoading, refetch } = useCarReportDetailQuery(id as string);
  const carDetail = carReport?.value;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!carDetail) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <MaterialIcons name="error-outline" size={48} color="#ff6b6b" />
        <Text className="mt-4 text-center text-lg font-medium">Report details not found</Text>
        <TouchableOpacity
          className="mt-4 rounded-lg bg-blue-500 px-4 py-2"
          onPress={() => refetch()}>
          <Text className="font-medium text-white">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <ReportHeader
        id={carDetail.id}
        status={carDetail.status}
        reporterName={carDetail.reporterName}
        reporterRole={carDetail.reporterRole}
      />

      <CarInfoCard carDetail={carDetail.carDetail} />

      <ReportDetailsCard
        title={carDetail.title}
        description={carDetail.description}
        // eslint-disable-next-line radix
        reportType={parseInt(carDetail.reportType)}
        imageUrls={carDetail.imageUrls}
      />

      {carDetail.inspectionScheduleDetail && (
        <InspectionScheduleCard inspectionDetail={carDetail.inspectionScheduleDetail} />
      )}

      {carDetail.bookings && carDetail.bookings.length > 0 && (
        <BookingsListCard bookings={carDetail.bookings} />
      )}

      {carDetail.resolvedAt && (
        <ResolutionCard
          resolvedAt={carDetail.resolvedAt}
          resolutionComments={carDetail.resolutionComments}
          resolvedById={carDetail.resolvedById}
        />
      )}
    </ScrollView>
  );
}
