import { Feather, Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import React, { FunctionComponent, useState, useRef } from 'react';
import { View, Text, LayoutChangeEvent, Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import FieldLayout from '~/components/layouts/field-layout';
import { TextWithIconNoBorder } from '~/components/layouts/text-icon-no-border';
import CardBasic from '~/components/plugins/card-basic';
import ImagePickerButton from '~/components/plugins/image-picker';
import Description from '~/components/screens/car-editor/description';
import { usePreInspectionForm } from '~/hooks/book/use-pre-inspection-form';
import { convertAssertToFile } from '~/lib/convert';
import { COLORS } from '~/theme/colors';

interface PreFormProps {
  form: ReturnType<typeof usePreInspectionForm>['form'];
}

const PreForm: FunctionComponent<PreFormProps> = ({ form }) => {
  const [exteriorPhotos, setExteriorPhotos] = useState<string[]>([]);
  const [fuelGaugePhotos, setFuelGaugePhotos] = useState<string[]>([]);
  const [carKeyPhotos, setCarKeyPhotos] = useState<string[]>([]);
  const [trunkPhotos, setTrunkPhotos] = useState<string[]>([]);
  const [parkingLocationPhotos, setParkingLocationPhotos] = useState<string[]>([]);

  // Lưu width của FieldLayout gần nhất
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
        'Ảnh Ngoại Thất',
        <MaterialCommunityIcons name="car-outline" size={20} color={COLORS.black} />,
        exteriorPhotos,
        setExteriorPhotos,
        'exteriorPhotos',
        true
      )}

      {renderImageField(
        'Ảnh Đồng Hồ Xăng',
        <MaterialCommunityIcons name="gas-station-outline" size={20} color={COLORS.black} />,
        fuelGaugePhotos,
        setFuelGaugePhotos,
        'fuelGaugePhotos',
        true
      )}

      {renderImageField(
        'Ảnh Chìa Khóa Xe',
        <Ionicons name="key-outline" size={20} color={COLORS.black} />,
        carKeyPhotos,
        setCarKeyPhotos,
        'carKeyPhotos',
        true
      )}

      {renderImageField(
        'Ảnh Cốp Xe',
        <MaterialCommunityIcons name="car-outline" size={20} color={COLORS.black} />,
        trunkPhotos,
        setTrunkPhotos,
        'trunkPhotos',
        true
      )}

      {renderImageField(
        'Ảnh Vị Trí Đỗ Xe',
        <SimpleLineIcons name="location-pin" size={20} color={COLORS.black} />,
        parkingLocationPhotos,
        setParkingLocationPhotos,
        'parkingLocationPhotos',
        true
      )}
    </CardBasic>
  );
};

export default PreForm;
