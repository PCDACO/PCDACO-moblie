import React from 'react';
import { Animated, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

import ImagePickerButton from '../image-picker/image-picker';

import { useCarForm } from '~/hooks/car/use-car-form';
import { Camera, CircleX } from '~/lib/icons/icon';

interface PickerImageCarProps {
  form: ReturnType<typeof useCarForm>['form'];
}

const PickerImageCar: React.FC<PickerImageCarProps> = ({ form }) => {
  const [viewWidth, setViewWidth] = React.useState<number>(0);
  const [activeIndex, setActiveIndex] = React.useState<number>(1);
  const [items, setItems] = React.useState<string[]>(form.watch('carImages'));

  const flatlistRef = React.useRef<FlatList<any>>(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  // const carImagesSelected = form.watch('carImages');

  React.useEffect(() => {
    const interval = setInterval(() => {
      //   const nextIndex = (activeIndex + 1) % items.length;
      if (items.length > 0) {
        const nextIndex = (activeIndex + 1) % items.length;
        flatlistRef.current?.scrollToIndex({ index: nextIndex });
        setActiveIndex(nextIndex);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    const carImagesSelected = form.watch('carImages');
    if (carImagesSelected) {
      setItems(carImagesSelected);
    }
  }, [form]);

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    // Update activeIndex when viewable items change
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index + 1);
    }
  };

  return (
    <View>
      {items.length > 0 && (
        <View className="h-60" onLayout={(event) => setViewWidth(event.nativeEvent.layout.width)}>
          <FlatList
            data={items}
            ref={flatlistRef}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            renderItem={({ item }) => (
              <View className={` relative h-60 p-2 shadow-md `} style={{ width: viewWidth }}>
                <Image
                  source={{ uri: item }}
                  className="size-full rounded-xl object-cover shadow-lg"
                />
                <TouchableOpacity
                  className="absolute right-4 top-4 rounded-full  p-1"
                  onPress={() => {
                    const updatedUris = items.filter((imageUri) => imageUri !== item);
                    setItems(updatedUris);
                    form.setValue('carImages', updatedUris as [string, ...string[]], {
                      shouldValidate: true,
                    });
                  }}>
                  <CircleX className="rounded-full bg-transparent text-destructive" size={18} />
                </TouchableOpacity>
              </View>
            )}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
              useNativeDriver: false,
            })}
            onViewableItemsChanged={onViewableItemsChanged}
          />
        </View>
      )}
      <ImagePickerButton
        onChange={(imageUris) => {
          if (imageUris.length > 0) {
            form.setValue('carImages', imageUris as [string, ...string[]], {
              shouldValidate: true,
            });
            setItems(imageUris);
          }
        }}
        contextInput={
          <>
            <Camera className="text-muted-foreground" size={40} />
            <Text className="text-xl font-medium text-muted-foreground">Chọn hình ảnh</Text>
          </>
        }
      />
      {form.formState.errors.carImages && (
        <Text className="text-sm text-destructive">{form.formState.errors.carImages.message}</Text>
      )}
    </View>
  );
};

export default PickerImageCar;
