import React, { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { FlatList, Text, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';

import ModelPicker from '../modal-picker';
import { Checkbox } from '../ui/checkbox';

import { AmentityResponse } from '~/constants/models/amenitiy';
import { useAmenities } from '~/hooks/amenity/use-amenity';
import { useCarForm } from '~/hooks/car/use-car-form';
import { Plus } from '~/lib/icons/icon';
import { useCarStore } from '~/stores/use-generic';

interface AmenityItemProps {
  data: AmentityResponse;
  form: ReturnType<typeof useCarForm>['form'];
}

const AmenityItem: React.FC<AmenityItemProps> = ({ data, form }) => {
  return (
    <Controller
      control={form.control}
      name="amenityIds"
      render={({ field: { value, onChange } }) => {
        const isChecked = value?.includes(data.id);
        return (
          <View className="flex-row items-center gap-2">
            <Checkbox
              checked={isChecked || false}
              onCheckedChange={() =>
                onChange(
                  isChecked ? value?.filter((id) => id !== data.id) : [...(value || []), data.id]
                )
              }
            />
            <Text
              onPress={() =>
                onChange(
                  isChecked ? value?.filter((id) => id !== data.id) : [...(value || []), data.id]
                )
              }>
              {data.name}
            </Text>
          </View>
        );
      }}
    />
  );
};

interface AmenitiesAfterSelectProps {
  name: string;
  icon: string;
}

const AmenitiesAfterSelect: React.FC<AmenitiesAfterSelectProps> = ({ name, icon }) => {
  return (
    <View
      className="flex-row items-center gap-2 rounded-lg border border-input bg-gray-200 p-2"
      style={{ width: '49%' }}>
      {icon ? <SvgUri width="20" height="20" source={{ uri: icon }} fill="#000000" /> : null}
      <Text className="text-base">{name}</Text>
    </View>
  );
};

interface AmenitiesListProps {
  form: ReturnType<typeof useCarForm>['form'];
}

const AmenitiesList: React.FC<AmenitiesListProps> = ({ form }) => {
  const { listAmenitiesQuery } = useAmenities({ params: { index: 1, size: 100 } });
  const { setData, data: carData } = useCarStore();

  const selectedAmenity = form.watch('amenityIds');

  const amentitiesSelected = listAmenitiesQuery.data?.value.items.filter((item) =>
    selectedAmenity?.includes(item.id)
  );

  const handleApply = useCallback(() => {
    setData({ ...carData, amenityIds: selectedAmenity });
  }, [selectedAmenity]);

  return (
    <View>
      {/* Danh sách tiện ích đã chọn */}
      <View className="flex-row flex-wrap gap-2">
        {amentitiesSelected?.map((item) => (
          <AmenitiesAfterSelect key={item.id} name={item.name} icon={item.iconUrl} />
        ))}
        <ModelPicker
          className=" rounded-lg border border-input"
          style={{ width: '59%' }}
          variant="secondary"
          icon={Plus}
          label={<Text className="text-base">Thêm tiện ích</Text>}
          fill="#F0F0F0"
          title="Đặc điểm xe"
          submitText="Áp dụng"
          onPress={handleApply}>
          <FlatList
            data={listAmenitiesQuery.data?.value.items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <AmenityItem data={item} form={form} />}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            scrollEnabled
          />
        </ModelPicker>
      </View>
    </View>
  );
};

export default AmenitiesList;
