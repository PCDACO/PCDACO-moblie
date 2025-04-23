import { Feather, FontAwesome5 } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { router, useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  RefreshControl,
  Pressable,
  Linking,
} from 'react-native';

import { Text } from '~/components/nativewindui/Text';
import Backdrop from '~/components/plugins/back-drop';
import BookContact from '~/components/screens/book-detail/book-contact';
import BookHeader from '~/components/screens/book-detail/book-header';
import BookInfo from '~/components/screens/book-detail/book-info';
import BookPayment from '~/components/screens/book-detail/book-payment';
import BookingDetailSkeleton from '~/components/screens/book-detail/book-skeleton';
import CarInfo from '~/components/screens/book-detail/car-info';
import DriverInfo from '~/components/screens/book-detail/driver-info';
import FeedbackCard from '~/components/screens/book-detail/feedback';
import { BookingStatusEnum } from '~/constants/enums';
import { useApproveOrRejectBooking } from '~/hooks/book/use-approve-or-reject-booking';
import { useBookingDetailQuery } from '~/hooks/book/use-book';
import { cn } from '~/lib/cn';
import { COLORS } from '~/theme/colors';

const BookingScreen = () => {
  const { id } = useLocalSearchParams();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
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

  const sheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['1%', '10%'], []);

  const handleSnapPress = React.useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
    setIsSheetOpen(index === snapPoints.length - 1);
  }, []);

  const handleSheetChange = React.useCallback((index: number) => {
    setIsSheetOpen(index === snapPoints.length - 1);
  }, []);

  const handleClosePress = React.useCallback(() => {
    sheetRef.current?.close();
    setIsSheetOpen(false);
  }, []);

  if (isLoading || !bookingDetail) {
    return <BookingDetailSkeleton />;
  }

  return (
    <View className="relative h-full">
      <View>
        <BookHeader onPress={() => handleSnapPress(1)} />

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
                  carImageUrl: [],
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
                  avatarUrl: '',
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
                  isRefund: false,
                  refundDate: new Date(),
                  refundAmount: 0,
                  preInspectionPhotos: {
                    exteriorCar: [],
                    fuelGauge: [],
                    carKey: [],
                    trunkSpace: [],
                    parkingLocation: [],
                  },
                  postInspectionPhotos: {
                    cleanliness: [],
                    scratches: [],
                    tollFees: [],
                    fuelGaugeFinal: [],
                  },
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

            <BookContact id={(id as string) || ''} />
            {(bookDetail?.booking.status === BookingStatusEnum.Completed ||
              bookDetail?.booking.status === BookingStatusEnum.Done) && (
              <FeedbackCard id={(id as string) || ''} feedback={bookDetail.feedbacks} />
            )}
          </View>
        </ScrollView>
      </View>
      <View className="z-1 absolute bottom-0 left-0 right-0 flex-row gap-2 bg-white p-4">
        {bookDetail?.booking.status === BookingStatusEnum.Pending && (
          <>
            <TouchableOpacity
              onPress={() => {
                handleApproveOrRejectBooking(false, '');
              }}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-gray-200 bg-background p-2 dark:border-gray-700">
              <Feather name="x-circle" size={20} color={COLORS.black} />
              <Text className="text-foreground">Từ chối</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: '/(screen)/(signature)/booking/[id]',
                  params: { id: id as string },
                });
              }}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-foreground p-2">
              <Feather name="check-circle" size={20} color={COLORS.white} />
              <Text className="text-background">Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${bookDetail?.driver.phone}`);
              }}
              className="flex-row items-center justify-center gap-2 rounded-full bg-green-500 px-2">
              <Feather name="phone" size={20} color={COLORS.white} />
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
            className="flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-primary p-2">
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
            className="flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-primary p-2">
            <Text className="text-background">Kiểm tra sau khi nhận xe</Text>
          </TouchableOpacity>
        )}
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        backdropComponent={
          isSheetOpen ? (props) => <Backdrop {...props} onPress={handleClosePress} /> : null
        }
        onChange={handleSheetChange}>
        <BottomSheetView className="relative z-30 flex-1 bg-white dark:bg-slate-300">
          <View className="gap-2 px-4">
            <View className="flex-row items-center justify-center gap-2">
              <Pressable
                onPress={() => {
                  router.push({
                    pathname: '/booking/inspection/view',
                    params: { id: id as string },
                  });
                }}
                className="flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-gray-200 p-2 dark:border-gray-700">
                <FontAwesome5 name="car" size={20} color={COLORS.black} />
                <Text className=" text-foreground">Trạng thái xe</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  router.push({
                    pathname: '/booking/report/[id]',
                    params: { id: id as string },
                  });
                }}
                disabled={
                  bookDetail?.booking.status !== BookingStatusEnum.Completed &&
                  bookDetail?.booking.status !== BookingStatusEnum.Done
                }
                className={cn(
                  'flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-gray-200 p-2 dark:border-gray-700',
                  bookDetail?.booking.status === BookingStatusEnum.Completed ||
                    bookDetail?.booking.status === BookingStatusEnum.Done
                    ? 'bg-foreground'
                    : 'bg-foreground/70'
                )}>
                <FontAwesome5 name="flag" size={20} color={COLORS.white} />
                <Text className=" text-background">Báo cáo</Text>
              </Pressable>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default BookingScreen;
