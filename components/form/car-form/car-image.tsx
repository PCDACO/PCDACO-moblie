import { Feather } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { FlatList, Image, Platform, Text, TouchableOpacity, View } from 'react-native';

import ImagePickerButton from '~/components/plugins/image-picker';
import Description from '~/components/screens/car-editor/description';
import Subtitle from '~/components/screens/car-editor/subtitle';
import { CarDetailResponse } from '~/constants/models/car.model';
import { useCarForm } from '~/hooks/car/use-car-form';
import { cn } from '~/lib/cn';
import { convertAssertToFile } from '~/lib/convert';

interface CarImageProps {
  form: ReturnType<typeof useCarForm>['form'];
  carImages?: CarDetailResponse['images'];
}

const CarImage: FunctionComponent<CarImageProps> = ({ form, carImages }) => {
  const [images, setImages] = React.useState<string[]>();

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
    if (!carImages) {
      if (form.watch('carImages')) {
        setImages(form.watch('carImages').map((item: any) => item.uri));
      }
    } else {
      setImages(carImages.filter((item) => item.type === 'Car').map((item) => item.url));
    }
  }, [form.watch('carImages')]);

  return (
    <View
      className={cn(
        'gap-6 rounded-lg bg-white p-4 dark:bg-gray-900',
        Platform.OS === 'ios' ? 'shadow-md' : 'elevation-3'
      )}
      style={
        Platform.OS === 'ios'
          ? {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }
          : {
              elevation: 3,
            }
      }>
      <Subtitle title="Hình ảnh xe" />
      <Description title="Hãy chụp ảnh xe của bạn từ nhiều góc độ khác nhau để người thuê có thể xem chi tiết." />

      {/* form */}
      <View>
        <View
          className="relative"
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
            keyExtractor={(item) => item}
            horizontal
            onViewableItemsChanged={onViewableItemsChanged}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="relative h-60">
                <Image
                  source={{ uri: item }}
                  style={{ width: viewWidth }}
                  className="h-60 rounded-lg object-cover"
                />
                <TouchableOpacity
                  className="absolute right-2 top-2"
                  onPress={() => {
                    setImages(undefined);
                    setActive(0);
                    form.setValue('carImages', []);
                  }}>
                  <Feather name="x-circle" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )}
          />

          {(images?.length === 0 || images?.length === undefined) && (
            <ImagePickerButton
              maxImages={10}
              multiple
              onChange={(image) => {
                setImages(image.map((item) => item.uri));

                const imageConvert = image.map((item) => convertAssertToFile(item));

                if (imageConvert.length > 0) {
                  form.setValue('carImages', imageConvert);
                }
              }}
              contextInput={
                <View className=" items-center gap-2 py-4">
                  <Feather name="camera" size={24} color="black" />
                  <View className="items-center ">
                    <Subtitle title="Chọn ảnh xe" />
                    <Description className="text-sm" title="tối thiểu 1 hình ảnh" />
                  </View>
                </View>
              }
            />
          )}
        </View>
        {form.formState.errors.carImages && (
          <Text className="text-red-500">{form.formState.errors.carImages.message}</Text>
        )}
      </View>

      <View className="gap-2">
        <Subtitle title="Mẹo chụp ảnh" />
        <View className="flex-row items-start gap-2">
          <Feather name="check-circle" size={20} color="green" />
          <View className="flex-wrap">
            <Description
              className="text-sm"
              title="Chụp ảnh xe từ các góc: trước, sau, hai bên và nội thất"
            />
          </View>
        </View>
        <View className="flex-row items-start gap-2">
          <Feather name="check-circle" size={20} color="green" />
          <View className="flex-wrap">
            <Description
              className="text-sm"
              title="Chụp trong điều kiện ánh sáng tốt để hình ảnh rõ nét"
            />
          </View>
        </View>
        <View className="flex-row items-start gap-2">
          <Feather name="check-circle" size={20} color="green" />
          <View className="flex-wrap">
            <Description className="text-sm" title="Đảm bảo xe sạch sẽ trước khi chụp ảnh" />
          </View>
        </View>
      </View>

      <View>
        <Subtitle title="Lưu ý" />
        <View className="flex-row flex-wrap items-center gap-2">
          <Description
            className="underline"
            title="Khi thay đổi ảnh,hệ thống sẽ xóa hết ảnh cũ và chỉ lưu ảnh mới"
          />
        </View>
      </View>
    </View>
  );
};

export default CarImage;
