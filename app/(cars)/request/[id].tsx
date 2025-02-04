import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import CommunitationCar from '~/components/car-detail/communitation-car';
import HeaderDetail from '~/components/car-detail/header-detail';
import SwiperImage from '~/components/swiper-image';

const CarDetailRequestScreen: FunctionComponent = () => {
  return (
    <View className="">
      <SwiperImage />
      <HeaderDetail
        name="Car Name"
        price={1000000}
        location="Sedan 2025s"
        city="Thành phố Hồ Chí Minh"
      />

      <CommunitationCar />
    </View>
  );
};

export default CarDetailRequestScreen;
