import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { FunctionComponent, useState, useRef } from 'react';
import { View, Text, LayoutChangeEvent, Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import FieldLayout from '~/components/layouts/field-layout';
import { TextWithIconNoBorder } from '~/components/layouts/text-icon-no-border';
import CardBasic from '~/components/plugins/card-basic';
import ImagePickerButton from '~/components/plugins/image-picker';
import Description from '~/components/screens/car-editor/description';
import { usePostInspectionForm } from '~/hooks/book/use-post-inspection-form';
import { convertAssertToFile } from '~/lib/convert';
import { COLORS } from '~/theme/colors';

interface PostFormProps {
  form: ReturnType<typeof usePostInspectionForm>['form'];
}

const PostForm: FunctionComponent<PostFormProps> = ({ form }) => {
  const [fuelGaugeFinalPhotos, setFuelGaugeFinalPhotos] = useState<string[]>([]);
  const [cleanlinessPhotos, setCleanlinessPhotos] = useState<string[]>([]);
  const [scratchesPhotos, setscratchesPhotos] = useState<string[]>([]);
  const [tollFeesPhotos, setTollFeesPhotos] = useState<string[]>([]);

  const fieldWidth = useRef(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    fieldWidth.current = event.nativeEvent.layout.width;
  };

  // Component hiển thị Swiper hoặc ImagePicker
  const renderImageField = (
    title: string,
    icon: JSX.Element,
    state: string[],
    setState: Function,
    formKey: string,
    required?: boolean
  ) => (
    <View onLayout={handleLayout} className="gap-2">
      <TextWithIconNoBorder
        icon={icon}
        fontWeight="bold"
        text={title}
        fontSize="md"
        required={required}
      />

      <FieldLayout
        className="text-sm font-normal text-muted-foreground"
        label={`Chụp ảnh ${title.toLowerCase()}`}>
        {state.length > 0 ? (
          <Carousel
            loop
            width={fieldWidth.current}
            height={200}
            autoPlay={false}
            data={state}
            renderItem={({ item }) => (
              <View className="relative">
                <Animated.Image
                  source={{ uri: item }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                  }}
                  resizeMode="cover"
                />
                <Pressable
                  className="absolute right-3 top-3 rounded-full bg-gray-200/50 "
                  onPress={() => {
                    setState([]);
                    form.setValue(formKey as any, undefined);
                  }}>
                  <Feather name="x-circle" size={20} color={COLORS.light.destructive} />
                </Pressable>
              </View>
            )}
          />
        ) : (
          <ImagePickerButton
            maxImages={10}
            multiple
            onChange={(data) => {
              setState(data.map((item) => item.uri));
              const imageCovert = data.map((item) => convertAssertToFile(item));
              form.setValue(formKey as any, imageCovert as any);
            }}
            contextInput={
              <View className="h-40 items-center justify-center">
                <Feather name="camera" size={20} color="gray" />
                <Text className="text-foreground">Nhấn để chọn ảnh</Text>
              </View>
            }
          />
        )}

        {(form.formState as any).errors[formKey] && (
          <Text className="text-destructive">
            {(form.formState as any).errors[formKey]?.message?.toString()}
          </Text>
        )}
      </FieldLayout>
    </View>
  );

  return (
    <CardBasic className="gap-4 pb-20">
      <View className="gap-1">
        <TextWithIconNoBorder
          icon={<Feather name="camera" size={24} color={COLORS.black} />}
          fontWeight="bold"
          text="Ảnh yêu cầu"
          fontSize="xl"
        />
        <Description className="text-sm" title="Chụp ảnh rõ ràng của từng khu vực yêu cầu của xe" />
      </View>

      {renderImageField(
        'Ảnh Đồng Hồ Xăng',
        <MaterialCommunityIcons name="gauge" size={20} color={COLORS.black} />,
        fuelGaugeFinalPhotos,
        setFuelGaugeFinalPhotos,
        'fuelGaugeFinalPhotos',
        true
      )}

      {renderImageField(
        'Ảnh Nội Thất',
        <MaterialCommunityIcons name="car-seat" size={20} color={COLORS.black} />,
        cleanlinessPhotos,
        setCleanlinessPhotos,
        'cleanlinessPhotos',
        true
      )}

      {renderImageField(
        'Ảnh Xước Xát',
        <MaterialCommunityIcons name="car-wrench" size={20} color={COLORS.black} />,
        scratchesPhotos,
        setscratchesPhotos,
        'scratchesPhotos',
        false
      )}

      {renderImageField(
        'Ảnh Phí Đường',
        <MaterialCommunityIcons name="road-variant" size={20} color={COLORS.black} />,
        tollFeesPhotos,
        setTollFeesPhotos,
        'tollFeesPhotos',
        false
      )}
    </CardBasic>
  );
};

export default PostForm;
