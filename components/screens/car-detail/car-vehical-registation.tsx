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
  const [active, setActive] = React.useState<number>(0);
  const [viewWidth, setViewWidth] = React.useState<number>(0);

  const flatlistRef = React.useRef<FlatList<any>>(null);

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActive(viewableItems[0].index + 1);
    } else {
      setActive(0);
    }
  };

  React.useEffect(() => {
    setImages(image.filter((item) => item.type === 'Paper').map((item) => item.url));
  }, [image]);

  return (
    <FieldLayout label="Giấy tờ của chiếc xe">
      <View
        className="relative rounded-lg border border-gray-200 dark:border-gray-800"
        onLayout={(event) => setViewWidth(event.nativeEvent.layout.width)}>
        {images?.length !== undefined && (
          <View className="absolute bottom-2 right-2 z-10 rounded-full bg-slate-200 p-2 dark:bg-slate-800">
            <Text className="text-black">
              {active}/{images?.length}
            </Text>
          </View>
        )}
        <FlatList
          ref={flatlistRef}
          data={images}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{ width: viewWidth }}
              className="h-60 object-cover "
            />
          )}
          horizontal
          onViewableItemsChanged={onViewableItemsChanged}
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
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
