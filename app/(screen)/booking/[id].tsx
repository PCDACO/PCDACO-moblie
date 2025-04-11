import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { ScrollView, TouchableOpacity, View, RefreshControl } from 'react-native';

import { Text } from '~/components/nativewindui/Text';
import Loading from '~/components/plugins/loading';
import BookHeader from '~/components/screens/book-detail/book-header';
import BookInfo from '~/components/screens/book-detail/book-info';
import BookPayment from '~/components/screens/book-detail/book-payment';
import CarInfo from '~/components/screens/book-detail/car-info';
import DriverInfo from '~/components/screens/book-detail/driver-info';
import { BookingStatusEnum } from '~/constants/enums';
import { useApproveOrRejectBooking } from '~/hooks/book/use-approve-or-reject-booking';
import { useBookingDetailQuery } from '~/hooks/book/use-book';
import { COLORS } from '~/theme/colors';

const BookingScreen = () => {
  const { id } = useLocalSearchParams();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const { data: bookingDetail, isLoading, refetch } = useBookingDetailQuery(id as string);
  const { handleApproveOrRejectBooking } = useApproveOrRejectBooking({ id: id as string });

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  const bookDetail = bookingDetail?.value;

  if (isLoading || !bookingDetail) {
    return (
      <View className="flex-1 items-center justify-center">
        <Loading />
      </View>
    );
  }

  return (
    <View className="relative h-full">
      <View>
        <BookHeader id={id as string} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}>
          <View className=" flex-1 gap-2 p-2" style={{ paddingBottom: 180 }}>
            <CarInfo
              car={
                bookDetail?.car || {
                  id: '',
                  modelName: '',
                  licensePlate: '',
                  color: '',
                  seat: 0,
                  transmissionType: '',
                  fuelType: '',
                }
              }
            />
            <DriverInfo
              driver={
                bookDetail?.driver || {
                  email: '',
                  id: '',
                  name: '',
                  phone: '',
                }
              }
            />
            <BookInfo
              booking={
                bookDetail?.booking || {
                  startTime: new Date(),
                  endTime: new Date(),
                  note: '',
                  status: '',
                  totalDistance: 0,
                  actualReturnTime: new Date(),
                }
              }
            />
            <BookPayment
              payment={
                bookDetail?.payment || {
                  basePrice: 0,
                  platformFee: 0,
                  excessDay: 0,
                  excessDayFee: 0,
                  totalAmount: 0,
                  isPaid: false,
                }
              }
            />
          </View>
        </ScrollView>
      </View>
      <View className="absolute bottom-0 left-0 right-0 z-20 flex-row gap-2 bg-white p-4">
        {bookDetail?.booking.status === BookingStatusEnum.Pending && (
          <>
            <TouchableOpacity
              onPress={() => {
                handleApproveOrRejectBooking(false);
              }}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-gray-200 bg-background p-4 dark:border-gray-700">
              <Feather name="x-circle" size={20} color={COLORS.black} />
              <Text className="text-foreground">Từ chối đặt xe</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleApproveOrRejectBooking(true);
              }}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-primary p-4">
              <Feather name="check-circle" size={20} color={COLORS.white} />
              <Text className="text-background">Xác nhận đặt xe</Text>
            </TouchableOpacity>
          </>
        )}

        {bookDetail?.booking.status === BookingStatusEnum.Approved && (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: '/booking/inspection/pre',
                params: {
                  bookId: bookDetail.id,
                },
              });
            }}
            className="flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-primary p-4">
            <Text className="text-background">Kiểm tra trước khi giao xe</Text>
          </TouchableOpacity>
        )}

        {bookDetail?.booking.status === BookingStatusEnum.Completed && (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: '/booking/inspection/post',
                params: {
                  bookId: bookDetail.id,
                },
              });
            }}
            className="flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-primary p-4">
            <Text className="text-background">Kiểm tra sau khi nhận xe</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default BookingScreen;
