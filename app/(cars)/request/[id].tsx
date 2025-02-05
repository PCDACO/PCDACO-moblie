import React, { FunctionComponent } from 'react';
import { ScrollView, Text, View } from 'react-native';

import CommunitationCar from '~/components/car-detail/communitation-car';
import CommunitationUserBook from '~/components/car-detail/communitation-user-book';
import HeaderDetail from '~/components/car-detail/header-detail';
import SwiperImage from '~/components/swiper-image';
import { Button } from '~/components/ui/button';

const CarDetailRequestScreen: FunctionComponent = () => {
  return (
    <>
      <ScrollView>
        <View className="gap-1 bg-slate-100">
          <View className="p-4">
            <SwiperImage />
          </View>
          <HeaderDetail
            name="Car Name"
            price={1000000}
            location="Sedan 2025s"
            city="Thành phố Hồ Chí Minh"
          />

          <CommunitationCar />
          <CommunitationUserBook />
        </View>
      </ScrollView>
      <View className="flex-row gap-2 p-4">
        <Button className="flex-1" variant="destructive">
          <Text className="font-semibold text-destructive">Từ chối yêu cầu</Text>
        </Button>
        <Button className="flex-1" variant="default">
          <Text className="font-semibold text-background">Chấp nhận yêu cầu</Text>
        </Button>
      </View>
    </>
  );
};

export default CarDetailRequestScreen;
