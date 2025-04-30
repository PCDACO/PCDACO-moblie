import { Feather } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { SvgUri } from 'react-native-svg';

import FieldLayout from '~/components/layouts/field-layout';
import CardShadow from '~/components/plugins/card-shadow';
import Description from '~/components/screens/car-editor/description';
import Subtitle from '~/components/screens/car-editor/subtitle';
import { AmenityResponseList } from '~/constants/models/amenity.model';
import { FuelResponseList } from '~/constants/models/fuel.model';
import { TransmissionResponseList } from '~/constants/models/transmission.model';
import { useAmenities } from '~/hooks/amentity/use-amentity';
import { useCarForm } from '~/hooks/car/use-car-form';
import { useFuelQuery } from '~/hooks/fuel/use-fuel';
import { useModelDetailQuery, useModelQuery } from '~/hooks/models/use-model';
import { useTransmissionQuery } from '~/hooks/transmission/use-transmission';
import { formatNumber } from '~/lib/utils';
import { COLORS } from '~/theme/colors';

interface CarPreviewProps {
  form: ReturnType<typeof useCarForm>['form'];
}

interface AmenityItemProps {
  amenity: AmenityResponseList;
}

export const AmenityItem = ({ amenity }: AmenityItemProps) => {
  return (
    <View className="flex-1 flex-row items-center gap-2 rounded-lg border border-gray-200 p-2">
      <SvgUri width="24" height="24" uri={amenity.iconUrl} />
      <Text className="text-foreground">{amenity.name}</Text>
    </View>
  );
};

const CarPreview: FunctionComponent<CarPreviewProps> = ({ form }) => {
  const [carImages, setCarImages] = React.useState<string[]>([]);
  const [paperImages, setPaperImages] = React.useState<string[]>([]);
  const [active, setActive] = React.useState<number>(0);
  const [viewWidth, setViewWidth] = React.useState<number>(0);
  const [viewWidthPaper, setViewWidthPaper] = React.useState<number>(0);
  const [activePaper, setActivePaper] = React.useState<number>(0);
  const [amenitiesId, setAmenitiesId] = React.useState<string[]>([]);
  const [transmission, setTransmission] = React.useState<TransmissionResponseList>();
  const [fuel, setFuel] = React.useState<FuelResponseList>();

  const flatlistRef = React.useRef<FlatList<any>>(null);
  const flatlistRefPaper = React.useRef<FlatList<any>>(null);

  const { data: amenities } = useAmenities({
    params: {
      index: 1,
      size: 100,
    },
  });

  const { data: modelData } = useModelQuery({
    params: { index: 1, size: 100 },
  });

  const { data: modelDetailData } = useModelDetailQuery({
    id: form.getValues('modelId'),
  });

  const { data: transmissionData } = useTransmissionQuery({
    params: { index: 1, size: 100 },
  });

  const { data: fuelData } = useFuelQuery({
    params: { index: 1, size: 100 },
  });

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActive(viewableItems[0].index + 1);
    } else {
      setActive(0);
    }
  };

  const onViewableItemsChangedPaper = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActivePaper(viewableItems[0].index + 1);
    } else {
      setActivePaper(0);
    }
  };
  const { watch } = form;

  React.useEffect(() => {
    const carImages: { uri: string; name: string; type: string }[] = watch('carImages');
    const paperImages: { uri: string; name: string; type: string }[] = watch('paperImages');
    const amentities: string[] = watch('amenityIds');

    const fuelTypeId: string = watch('fuelTypeId');
    const transmissionTypeId: string = watch('transmissionTypeId');

    if (carImages.length > 0) {
      setCarImages(carImages.map((image) => image.uri));
    }

    if (amentities.length > 0) {
      setAmenitiesId(amentities);
    }

    if (fuelTypeId) {
      const fuel = fuelData?.value.items.find((item) => item.id === fuelTypeId);
      setFuel(fuel);
    }

    if (transmissionTypeId) {
      const transmission = transmissionData?.value.items.find(
        (item) => item.id === transmissionTypeId
      );
      setTransmission(transmission);
    }

    if (paperImages.length > 0) {
      setPaperImages(paperImages.map((image) => image.uri));
    }
  }, [watch, modelData, fuelData, transmissionData]);

  const filterAmenities = amenities?.value.items.filter((item) => amenitiesId.includes(item.id));
  const description = watch('description');
  const price = watch('price');
  const requiresCollateral = watch('requiresCollateral');
  const terms = watch('terms');
  const color = watch('color');
  const address = watch('pickupAddress');
  const fuelConsumption = watch('fuelConsumption');

  return (
    <View className="gap-4 bg-white px-2 py-4 dark:bg-gray-900">
      <Subtitle title="Xem lại thông tin" />
      <Description title="Kiểm tra lại thông tin trước khi hoàn tất đăng ký xe." />

      <FieldLayout label="Hình ảnh xe">
        <View
          className="relative"
          onLayout={(event) => setViewWidth(event.nativeEvent.layout.width)}>
          <FlatList
            ref={flatlistRef}
            data={carImages}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                className="h-60"
                style={{
                  width: viewWidth,
                }}
              />
            )}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
          />
        </View>
        <View className="absolute bottom-2 right-2 z-10 rounded-full bg-slate-200 p-2 dark:bg-slate-800">
          <Text className="text-black">
            {active || 0}/{carImages.length || 0}
          </Text>
        </View>
      </FieldLayout>

      <FieldLayout label="Thông tin xe">
        <View className="rounded-lg border border-input p-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-500">Mẫu xe</Text>
            <Text className="text-foreground">{modelDetailData?.value.name || ''}</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-gray-500">Màu sắc</Text>
            <Text className="text-foreground">{color || ''}</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-gray-500">Loại nhiên liệu</Text>
            <Text className="text-foreground">{fuel?.name || ''}</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-gray-500">Hộp số</Text>
            <Text className="text-foreground">{transmission?.name || ''}</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-gray-500">Tiêu thụ nhiên liệu</Text>
            <Text className="text-foreground">{fuelConsumption || 0} l/100km</Text>
          </View>
          <View className="flex-row items-start justify-between" style={{ gap: 40 }}>
            <Text className="text-gray-500">Địa chỉ nhận xe</Text>
            <Text className="w-40 flex-1 break-words text-right text-foreground" numberOfLines={2}>
              {address || ''}
            </Text>
          </View>
        </View>
      </FieldLayout>

      <FieldLayout label="Tiện nghi">
        <FlatList
          data={filterAmenities}
          renderItem={({ item }) => <AmenityItem amenity={item} />}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ gap: 8 }}
          ItemSeparatorComponent={() => <View className="h-2" />}
        />
      </FieldLayout>

      <FieldLayout label="Mô tả">
        <View className="rounded-lg border border-input p-4">
          <Markdown>{description || ''}</Markdown>
        </View>
      </FieldLayout>

      <FieldLayout label="Giá & điều khoản">
        <View className="gap-2 rounded-lg border border-input p-4">
          <View className="flex-row items-center justify-between">
            <Description className="text-sm" title="Giá thuê" />
            <Text>{formatNumber(price || 0)}/VNĐ</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Description className="text-sm" title="Yêu cầu thế chấp" />
            <Text>{requiresCollateral ? 'Có' : 'Không'}</Text>
          </View>
          <View className="gap-2">
            <Description className="text-sm" title="Điều khoản" />
            <Markdown>{terms || ''}</Markdown>
          </View>
        </View>
      </FieldLayout>

      <FieldLayout label="Giấy tờ xe">
        <View
          className="relative"
          onLayout={(event) => setViewWidthPaper(event.nativeEvent.layout.width)}>
          <FlatList
            ref={flatlistRefPaper}
            data={paperImages}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                className="h-60 rounded-lg"
                resizeMode="cover"
                style={{
                  width: viewWidthPaper,
                }}
              />
            )}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChangedPaper}
          />
        </View>
        <View className="absolute bottom-2 right-2 z-10 rounded-full bg-slate-200 p-2 dark:bg-slate-800">
          <Text className="text-black">
            {activePaper || 0}/{paperImages.length || 0}
          </Text>
        </View>
      </FieldLayout>

      <CardShadow className="flex-row items-center gap-4 p-4">
        <View className="bg-primary/20 items-center rounded-full p-2">
          <Feather name="check" size={24} color={COLORS.light.primary} />
        </View>
        <View>
          <Subtitle title="Sẵn sàng hoàn tất" />
          <View className="flex-wrap">
            <Description title={`Nhấn nút "Hoàn tất" ở dưới để đăng ký xe của bạn.`} />
          </View>
        </View>
      </CardShadow>
    </View>
  );
};

export default CarPreview;
