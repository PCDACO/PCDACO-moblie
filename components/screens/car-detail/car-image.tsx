import { FunctionComponent } from 'react';
import { View } from 'react-native';

import CarStatusBadge from '../car-list/car-status-badge';

import SwiperImages, { SwiperImageItem } from '~/components/plugins/swiper-images';
import { CarDetailResponse } from '~/constants/models/car.model';

interface CarImagesProps {
  images: SwiperImageItem[];
  status: CarDetailResponse['status'];
}

const CarImages: FunctionComponent<CarImagesProps> = ({ images, status }) => {
  return (
    <View className="relative">
      <SwiperImages images={images} />
      <View className="z-0.5 absolute bottom-4 left-2">
        <CarStatusBadge
          status={status}
          className="px-6 py-2"
          textSize="text-sm"
          fontWeight="font-bold"
        />
      </View>
    </View>
  );
};
export default CarImages;
