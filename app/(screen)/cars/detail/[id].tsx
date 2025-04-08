import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Animated, Pressable, Text } from 'react-native';

import Backdrop from '~/components/plugins/back-drop';
import Loading from '~/components/plugins/loading';
import { SwiperImageItem } from '~/components/plugins/swiper-images';
import TabView, { Tab } from '~/components/plugins/tab-view';
import CarAmentity from '~/components/screens/car-detail/car-amentity';
import CarBasicInfo from '~/components/screens/car-detail/car-basic-info';
import CarCalendar from '~/components/screens/car-detail/car-calendar';
import CarConfiguration from '~/components/screens/car-detail/car-configuation';
import CarContact from '~/components/screens/car-detail/car-contact';
import CarDescription from '~/components/screens/car-detail/car-description';
import CarHeader from '~/components/screens/car-detail/car-header';
import CarImages from '~/components/screens/car-detail/car-image';
import CarTerm from '~/components/screens/car-detail/car-term';
import CarVehicalRegistration from '~/components/screens/car-detail/car-vehical-registation';
import { CarStatus } from '~/constants/enums';
import { CarDetailResponse } from '~/constants/models/car.model';
import { useCarQueries } from '~/hooks/car/use-car';
import { useToggleCarStatus } from '~/hooks/car/use-toggle-car-status';
import { useGetLocationCar } from '~/hooks/plugins/use-get-location';
import { usePanResponder } from '~/hooks/plugins/use-pan-responder';
import { cn } from '~/lib/cn';
import { useStepStore } from '~/store/use-step';
import { COLORS } from '~/theme/colors';

const CarDetailScreen = () => {
  const { resetStep } = useStepStore();
  // const [locationData, setLocationData] = React.useState<{
  //   carId: string;
  //   latitude: number;
  //   longitude: number;
  // } | null>(null);

  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleMonthChange = (month: number, year: number) => {
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  const { id } = useLocalSearchParams();

  useGetLocationCar(id as string, (value) => {
    console.log('value', value);
  });
  const { detailQuery, unavailableQuery, contactQuery } = useCarQueries({
    id: id as string,
    month: currentMonth,
    year: currentYear,
  });

  const { handleToggleCarStatus } = useToggleCarStatus({ id: id as string });

  const car = detailQuery.data;
  const isLoading = detailQuery.isLoading;

  const unavailable = unavailableQuery.data;
  const isLoadingUnavailable = unavailableQuery.isLoading;

  const contact = contactQuery.data;
  const isLoadingContact = contactQuery.isLoading;

  const sheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['1%', '20%'], []);

  const { slideAnim, panResponder } = usePanResponder();

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

  const carImages: SwiperImageItem[] =
    car?.value.images
      .filter((item) => item.type === 'Car')
      .map((image) => ({
        id: image.id,
        url: image.url,
      })) || [];

  if (isLoading || isLoadingContact || isLoadingUnavailable) {
    return (
      <View className="h-full flex-1 items-center justify-center">
        <Loading />
      </View>
    );
  }

  const paperImages = car?.value.images.filter((item) => item.type === 'Paper');

  const tabs: Tab[] = [
    {
      title: 'Thông tin xe',
      content: (
        <View
          className=" h-full gap-6 py-2"
          style={{
            paddingBottom: 100,
          }}>
          <CarBasicInfo car={car?.value as CarDetailResponse} />
          <CarConfiguration car={car?.value as CarDetailResponse} />
          <CarDescription description={car?.value.description || ''} />
          <CarAmentity amenity={car?.value.amenities || []} />
          <CarTerm term={car?.value.terms || ''} />
          <CarVehicalRegistration image={paperImages || []} />
        </View>
      ),
      key: 'car-info',
    },
    {
      title: 'Thời gian ',
      content: (
        <CarCalendar
          onMonthChange={handleMonthChange}
          unavailableDates={unavailable?.value.map((date) => new Date(date.date)) || []}
        />
      ),
      key: 'car-unavailable-time',
    },
    {
      title: 'Hợp đồng',
      content: (
        <CarContact
          id={car?.value.id || ''}
          contract={contact}
          carContract={car?.value.contract as CarDetailResponse['contract']}
          month={currentMonth}
          year={currentYear}
        />
      ),
      key: 'contract',
    },
  ];

  return (
    <View className="relative flex-1 bg-slate-100 dark:bg-slate-900">
      <CarHeader onEdit={() => handleSnapPress(snapPoints.length - 1)} />
      <CarImages images={carImages} status={car?.value.status || ''} />

      <Animated.View
        className="z-0.5 absolute bottom-0 left-0 right-0 top-0 items-center justify-center rounded-t-3xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-slate-900"
        style={{
          paddingTop: 10,
          transform: [{ translateY: slideAnim }],
        }}>
        <View {...panResponder.panHandlers} className="h-6 w-full items-center justify-center">
          <View className="h-1 w-20 rounded-full bg-gray-200 dark:bg-gray-800" />
        </View>

        <View className="w-full flex-1">
          <TabView
            tabs={tabs}
            initialTab={0}
            headerClassName="shadow-sm"
            contentClassName="bg-gray-50"
          />
        </View>
      </Animated.View>

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        backdropComponent={
          isSheetOpen ? (props) => <Backdrop {...props} onPress={handleClosePress} /> : null
        }
        onChange={handleSheetChange}>
        <BottomSheetView className="relative flex-1 bg-white dark:bg-slate-300">
          <View className="absolute bottom-10 left-0 right-0 gap-2 px-4">
            <View className="flex-1 flex-row justify-between gap-2 ">
              <Pressable
                className="flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-gray-400 p-2"
                onPress={() => {
                  handleClosePress();
                  resetStep();
                  router.push({
                    pathname: '/(screen)/cars/edit',
                    params: {
                      id: car?.value.id,
                    },
                  });
                }}>
                <Ionicons name="create-outline" size={20} color="black" />
                <Text>Thay đổi xe</Text>
              </Pressable>
              <Pressable
                className="flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-gray-200 bg-black p-2"
                onPress={() => {
                  handleClosePress();
                  router.push({
                    pathname: '/(screen)/cars/availability/[id]',
                    params: {
                      id: car?.value.id || '',
                    },
                  });
                }}>
                <Ionicons name="time-outline" size={20} color="white" />
                <Text className="text-white">Thời gian</Text>
              </Pressable>
              <Pressable
                className={cn(
                  'flex-row items-center justify-center gap-2 rounded-full border border-gray-400 p-2',
                  car?.value.status === CarStatus.Available ? 'bg-red-400' : 'bg-green-400'
                )}
                onPress={() => {
                  handleClosePress();
                  handleToggleCarStatus(
                    car?.value.status === CarStatus.Available
                      ? CarStatus.Inactive
                      : CarStatus.Available
                  );
                }}>
                <Ionicons
                  name={car?.value.status === CarStatus.Available ? 'power-outline' : 'power'}
                  size={20}
                  color={COLORS.white}
                />
              </Pressable>
            </View>
            <Pressable
              className="flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-gray-400 p-2"
              onPress={() => {
                handleClosePress();
                resetStep();
                router.push({
                  pathname: '/(screen)/cars/edit',
                  params: {
                    id: car?.value.id,
                  },
                });
              }}>
              <Ionicons name="map-outline" size={20} color="black" />
              <Text>Kiểm tra vị trí xe</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default CarDetailScreen;
