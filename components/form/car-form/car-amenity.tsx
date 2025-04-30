import React, { FunctionComponent } from 'react';
import { Controller } from 'react-hook-form';
import { View, Text, FlatList, Pressable } from 'react-native';
import { SvgUri } from 'react-native-svg';

import CardBasic from '~/components/plugins/card-basic';
import Loading from '~/components/plugins/loading';
import Description from '~/components/screens/car-editor/description';
import Subtitle from '~/components/screens/car-editor/subtitle';
import { AmenityResponseList } from '~/constants/models/amenity.model';
import { useAmenities } from '~/hooks/amentity/use-amentity';
import { useCarForm } from '~/hooks/car/use-car-form';

interface CarAmenityProps {
  form: ReturnType<typeof useCarForm>['form'];
}

interface AmenityItemProps {
  amenity: AmenityResponseList;
  selected: boolean;
  onPress: () => void;
}

const AmenityItem = ({ amenity, selected, onPress }: AmenityItemProps) => {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-1 flex-row items-center gap-2 rounded-lg border p-2 ${
        selected ? 'bg-primary/10 border-primary' : 'border-gray-200'
      }`}>
      <SvgUri width="24" height="24" uri={amenity.iconUrl} />
      <Text numberOfLines={1} className={selected ? 'text-primary' : 'text-gray-800'}>
        {amenity.name}
      </Text>
    </Pressable>
  );
};

const CarAmenity: FunctionComponent<CarAmenityProps> = ({ form }) => {
  const { data: amenities, isLoading } = useAmenities({
    params: {
      index: 1,
      size: 200,
    },
  });

  if (isLoading) {
    return (
      <View className="h-screen flex-1 items-center justify-center">
        <Loading />
      </View>
    );
  }

  return (
    <View className=" px-2 py-4">
      <CardBasic className="gap-8">
        <View className="gap-6">
          <Subtitle title="Tiện nghi xe" />
          <Description
            title="Chọn các tiện nghi có sẵn trên xe của bạn để người thuê biết thêm về xe."
            className="text-sm"
          />

          <View>
            {form.formState.errors.amenityIds && (
              <Text className="text-red-500">{form.formState.errors.amenityIds.message}</Text>
            )}
            <Controller
              control={form.control}
              name="amenityIds"
              render={({ field: { value, onChange } }) => (
                <FlatList
                  data={
                    amenities?.value.items ||
                    amenities?.value.items.filter(
                      (item) => !form.watch('amenityIds').includes(item.id)
                    )
                  }
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <AmenityItem
                      amenity={item}
                      selected={value?.includes(item.id)}
                      onPress={() => {
                        const currentIds = value || [];
                        const newIds = currentIds.includes(item.id)
                          ? currentIds.filter((id) => id !== item.id)
                          : [...currentIds, item.id];
                        onChange(newIds);
                      }}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                  columnWrapperStyle={{ gap: 8 }}
                  ItemSeparatorComponent={() => <View className="h-2" />}
                />
              )}
            />
          </View>
        </View>
        <View className="gap-2">
          <Subtitle title="Lưu ý" />
          <Description
            title="Các tiện nghi được chọn sẽ hiển thị trên trang chi tiết xe của bạn. Người thuê có thể tìm kiếm xe dựa trên các tiện nghi này."
            className="text-xs"
          />
        </View>
      </CardBasic>
    </View>
  );
};

export default CarAmenity;
