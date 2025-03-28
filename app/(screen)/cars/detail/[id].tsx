import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View, Animated } from 'react-native';

import Loading from '~/components/plugins/loading';
import { SwiperImageItem } from '~/components/plugins/swiper-images';
import CarAmentity from '~/components/screens/car-detail/car-amentity';
import CarBasicInfo from '~/components/screens/car-detail/car-basic-info';
import CarConfiguration from '~/components/screens/car-detail/car-configuation';
import CarDescription from '~/components/screens/car-detail/car-description';
import CarHeader from '~/components/screens/car-detail/car-header';
import CarImages from '~/components/screens/car-detail/car-image';
import CarTerm from '~/components/screens/car-detail/car-term';
import CarVehicalRegistration from '~/components/screens/car-detail/car-vehical-registation';
import { CarDetailResponse } from '~/constants/models/car.model';
import { useCarDetailQuery } from '~/hooks/car/use-car';
import { usePanResponder } from '~/hooks/plugins/use-pan-responder';

const CarDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { data: car, isLoading } = useCarDetailQuery({ id: id as string });
  const [isExpanded, setIsExpanded] = useState(false);

  const { slideAnim, panResponder } = usePanResponder({
    onExpand: () => setIsExpanded(true),
    onCollapse: () => setIsExpanded(false),
  });

  if (isLoading) {
    return (
      <View className="h-full flex-1 items-center justify-center">
        <Loading />
      </View>
    );
  }

  const carImages: SwiperImageItem[] =
    car?.value.images
      .filter((item) => item.type === 'Car')
      .map((image) => ({
        id: image.id,
        url: image.url,
      })) || [];

  const paperImages = car?.value.images.filter((item) => item.type === 'Paper');

  return (
    <View className="relative flex-1 bg-slate-100 dark:bg-slate-900">
      <CarHeader id={id as string} />
      <CarImages images={carImages} status={car?.value.status || ''} />

      <Animated.View
        className="absolute bottom-0 left-0 right-0 top-0 z-10 items-center justify-center rounded-t-3xl border border-gray-200 bg-white px-6 shadow-lg dark:border-gray-800 dark:bg-slate-900"
        style={{
          paddingTop: 10,
          transform: [{ translateY: slideAnim }],
        }}>
        <View {...panResponder.panHandlers} className="h-6 w-full items-center justify-center">
          <View className="h-1 w-20 rounded-full bg-gray-200 dark:bg-gray-800" />
        </View>

        <ScrollView
          className="mb-10 h-screen w-full"
          scrollEnabled={isExpanded}
          style={{
            marginBottom: 100,
          }}
          showsVerticalScrollIndicator={false}>
          <View
            className=" h-full gap-6 py-2"
            style={{
              marginBottom: 20,
            }}>
            <CarBasicInfo car={car?.value as CarDetailResponse} />
            <CarConfiguration car={car?.value as CarDetailResponse} />
            <CarDescription description={car?.value.description || ''} />
            <CarAmentity amenity={car?.value.amenities || []} />
            <CarTerm term={car?.value.terms || ''} />
            <CarVehicalRegistration image={paperImages || []} />
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default CarDetailScreen;
