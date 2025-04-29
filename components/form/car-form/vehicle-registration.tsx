import { Feather } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

import CardBasic from '~/components/plugins/card-basic';
import ImagePickerButton from '~/components/plugins/image-picker';
import Description from '~/components/screens/car-editor/description';
import Subtitle from '~/components/screens/car-editor/subtitle';
import { useCarForm } from '~/hooks/car/use-car-form';
import { convertAssertToFile } from '~/lib/convert';

interface VehicleRegistrationProps {
  form: ReturnType<typeof useCarForm>['form'];
}

const VehicleRegistration: FunctionComponent<VehicleRegistrationProps> = ({ form }) => {
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
    if (form.watch('paperImages')) {
      setImages(form.watch('paperImages').map((item: any) => item.uri));
    }
  }, [form.watch('paperImages')]);

  return (
    <View className=" px-1 py-4">
      <CardBasic className="gap-6">
        <Subtitle title="Thêm hình ảnh giấy tờ xe" />
        <Description
          title="Hãy chụp ảnh giấy tờ xe của bạn để xác minh thông tin."
          className="text-sm"
        />

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
                  className="h-60 rounded-lg object-cover shadow-lg"
                />
                <TouchableOpacity
                  className="absolute right-2 top-2"
                  onPress={() => {
                    setImages(undefined);
                    setActive(0);
                    form.setValue('paperImages', []);
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
                  form.setValue('paperImages', imageConvert);
                }
              }}
              contextInput={
                <View className=" items-center gap-2 py-4">
                  <Feather name="camera" size={24} color="black" />
                  <View className="items-center ">
                    <Subtitle title="Chọn giấy tờ xe" />
                    <Description className="text-sm" title="tối thiểu 1 hình ảnh" />
                  </View>
                </View>
              }
            />
          )}
          {form.formState.errors.paperImages && (
            <Text className="text-red-500">{form.formState.errors.paperImages.message}</Text>
          )}
        </View>

        <View className="gap-4">
          <Subtitle title="Giấy tờ cần thiết" />
          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <Feather name="check-circle" size={24} color="green" />
              <Description title="Giấy đăng ký xe (bắt buộc)" className="text-sm" />
            </View>
            <View className="flex-row items-center gap-2">
              <Feather name="check-circle" size={24} color="green" />
              <Description title="Giấy đăng kiểm xe (bắt buộc)" className="text-sm" />
            </View>
            <View className="flex-row items-center gap-2">
              <Feather name="check-circle" size={24} color="green" />
              <Description title="Bảo hiểm xe (bắt buộc)" className="text-sm" />
            </View>
          </View>
        </View>

        <View>
          <Subtitle title="Lưu ý" />
          <Description
            title="Khi bạn thay đổi giấy tờ xe, hệ thống sẽ xóa hết giấy tờ cũ và chỉ lưu giấy tờ mới"
            className="text-sm"
          />
        </View>
      </CardBasic>
    </View>
  );
};

export default VehicleRegistration;
