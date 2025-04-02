import React, { FunctionComponent } from 'react';
import { View, FlatList, Text, Image } from 'react-native';

// import { DocumentItem } from '~/components/form/car-form/vehicle-registration';
import FieldLayout from '~/components/layouts/field-layout';
import { CarDetailResponse } from '~/constants/models/car.model';

interface CarVehicalRegistrationProps {
  image: CarDetailResponse['images'];
}

const CarVehicalRegistration: FunctionComponent<CarVehicalRegistrationProps> = ({ image }) => {
  const [images, setImages] = React.useState<string[]>([]);
  const [viewWidth, setViewWidth] = React.useState<number>(0);

  const flatlistRef = React.useRef<FlatList<any>>(null);

  React.useEffect(() => {
    setImages(image.filter((item) => item.type === 'Paper').map((item) => item.url));
  }, [image]);

  return (
    <FieldLayout label="Giấy tờ của chiếc xe">
      <View
        className="relative rounded-lg border border-gray-200 dark:border-gray-800"
        onLayout={(event) => setViewWidth(event.nativeEvent.layout.width)}>
        <FlatList
          ref={flatlistRef}
          data={images}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{ width: viewWidth }}
              className="h-60 rounded-xl object-cover"
            />
          )}
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-1" />}
          ListEmptyComponent={() => (
            <View className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
              <Text>Không có giấy tờ</Text>
            </View>
          )}
        />
      </View>
    </FieldLayout>
  );
};

export default CarVehicalRegistration;
