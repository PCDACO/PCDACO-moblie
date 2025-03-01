import * as ImagePicker from 'expo-image-picker';
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
  const [items, setItems] = React.useState<File[]>([]);

  // console.log('activeIndex', activeIndex);
  // console.log('image', form.watch('carImages'));

  const flatlistRef = React.useRef<FlatList<any>>(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (items.length > 0) {
        const nextIndex = (activeIndex + 1) % items.length;

        flatlistRef.current?.scrollToIndex({ index: nextIndex });
        setActiveIndex(nextIndex);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [items, activeIndex]);

  React.useEffect(() => {
    const carImagesSelected = form.watch('carImages');
    // Update items when carImagesSelected change
    if (carImagesSelected) {
      setItems(carImagesSelected);
    }
  }, [form]);

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    // Update activeIndex when viewable items change
    // console.log('viewableItems', viewableItems[0].index);

    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index + 1);
    } else {
      setActiveIndex(0);
    }
  };

  const handleAddImage = React.useCallback(
    (newImages: ImagePicker.ImagePickerAsset[]) => {
      // Convert ImagePickerAsset to File
      const newImage = newImages.map((image) => {
        return {
          uri: image.uri,
          name: image.fileName || 'image.jpg',
          type: image.mimeType || 'image/jpeg',
        } as unknown as File;
      });

      newImage.forEach((image) => {
        setItems((prev) => [...prev, image]);
      });

      if (newImage.length > 0) {
        form.setValue('carImages', [...items, ...newImage] as [File, ...File[]]);
      }
    },
    [items]
  );

  const handleRemoveImage = React.useCallback(
    (item: any) => {
      const removeImage = items.filter((image) => image.name !== item.name);
      setItems(removeImage);
      form.setValue('carImages', removeImage as [File, ...File[]]);

      if (activeIndex === 0) {
        flatlistRef.current?.scrollToIndex({ index: 0 });
      }
    },
    [items]
  );

  return (
    <View>
      {items.length > 0 && (
        <View
          className="relative h-60"
          onLayout={(event) => setViewWidth(event.nativeEvent.layout.width)}>
          <FlatList
            data={items}
            ref={flatlistRef}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            renderItem={({ item }) => {
              return (
                <View className={` relative h-60 p-2 shadow-md `} style={{ width: viewWidth }}>
                  {item && (
                    <Image
                      source={{ uri: item.uri }}
                      className="size-full rounded-xl object-cover shadow-lg"
                    />
                  )}
                  <TouchableOpacity
                    className="absolute right-4 top-4 rounded-full  p-1"
                    onPress={() => {
                      handleRemoveImage(item);
                    }}>
                    <CircleX className="rounded-full bg-background/90 text-destructive" size={18} />
                  </TouchableOpacity>
                </View>
              );
            }}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
              useNativeDriver: false,
            })}
            onViewableItemsChanged={onViewableItemsChanged}
          />
          <ImagePickerButton
            className="absolute bottom-4 right-4 items-center justify-center rounded-full border border-none bg-background/80 p-2"
            contextInput={<Camera className="text-muted-foreground" size={18} />}
            onChange={(imageUris) => {
              if (imageUris.length > 0) {
                handleAddImage(imageUris);
              }
            }}
          />
        </View>
      )}
      {items.length === 0 && (
        <ImagePickerButton
          className="h-60"
          onChange={(imageUris) => {
            if (imageUris.length > 0) {
              handleAddImage(imageUris);
            }
          }}
          contextInput={
            <>
              <Camera className="text-muted-foreground" size={40} />
              <Text className="text-xl font-medium text-muted-foreground">Chọn hình ảnh</Text>
            </>
          }
        />
      )}
      {form.formState.errors.carImages && (
        <Text className="text-sm text-destructive">{form.formState.errors.carImages.message}</Text>
      )}
    </View>
  );
};

export default PickerImageCar;
