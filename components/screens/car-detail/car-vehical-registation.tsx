import React, { FunctionComponent } from 'react';
import { View, Text, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import FieldLayout from '~/components/layouts/field-layout';
import { CarDetailResponse } from '~/constants/models/car.model';

interface CarVehicalRegistrationProps {
  image: CarDetailResponse['images'];
}

const CarVehicalRegistration: FunctionComponent<CarVehicalRegistrationProps> = ({ image }) => {
  const [images, setImages] = React.useState<string[]>([]);
  const [viewWidth, setViewWidth] = React.useState<number>(300);

  React.useEffect(() => {
    setImages(image.filter((item) => item.type === 'Paper').map((item) => item.url));
  }, [image]);

  return (
    <FieldLayout label="Giấy tờ của chiếc xe">
      <View
        className="relative rounded-lg border border-gray-200 dark:border-gray-800"
        onLayout={(event) => setViewWidth(event.nativeEvent.layout.width)}>
        {images.length > 0 ? (
          <Carousel
            loop
            width={viewWidth}
            height={240}
            data={images}
            scrollAnimationDuration={1000}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} className="h-full w-full rounded-xl object-cover" />
            )}
          />
        ) : (
          <View className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
            <Text>Không có giấy tờ</Text>
          </View>
        )}
      </View>
    </FieldLayout>
  );
};

export default CarVehicalRegistration;
