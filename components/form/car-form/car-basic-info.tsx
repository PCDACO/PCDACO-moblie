import { FontAwesome5, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { Controller } from 'react-hook-form';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';

import FieldLayout from '~/components/layouts/field-layout';
import { Input } from '~/components/layouts/input-with-icon';
import CardBasic from '~/components/plugins/card-basic';
import Subtitle from '~/components/screens/car-editor/subtitle';
import { useCarForm } from '~/hooks/car/use-car-form';
import { useModelDetailQuery } from '~/hooks/models/use-model';
import { useLocationStore } from '~/store/use-location';
import { COLORS } from '~/theme/colors';

interface CarBasicInfoProps {
  form: ReturnType<typeof useCarForm>['form'];
  onShowSheet: (value: string) => void;
}

const CarBasicInfo: FunctionComponent<CarBasicInfoProps> = ({ form, onShowSheet }) => {
  const router = useRouter();
  const selectedLocation = useLocationStore((state) => state.selectedLocation);

  const { data: modelDetail } = useModelDetailQuery({ id: form.watch('modelId') });

  React.useEffect(() => {
    if (selectedLocation) {
      form.setValue('pickupAddress', selectedLocation.address);
      form.setValue('pickupLatitude', selectedLocation.latitude);
      form.setValue('pickupLongitude', selectedLocation.longitude);
    }
  }, [selectedLocation, form.watch('modelId')]);

  const handlePickupAddressPress = () => {
    router.push('/map');
  };

  return (
    <View className="gap-4 px-1 py-4">
      {/* form car basic info */}
      <CardBasic>
        <Subtitle title="Thông tin xe" />
        <View className="gap-4">
          <FieldLayout label="Mẫu xe" className="relative">
            <TouchableOpacity
              className="flex-row items-center justify-between rounded-md border border-gray-300 px-2 py-3"
              onPress={() => onShowSheet('Model')}>
              {modelDetail?.value.name ? (
                <Text className="text-sm font-medium">{modelDetail?.value.name}</Text>
              ) : (
                <Text className="text-sm font-medium text-gray-300">Nhấn chọn mẫu xe</Text>
              )}
              <View className="flex-row items-center gap-1">
                {form.watch('modelId') && (
                  <Pressable onPress={() => form.setValue('modelId', '')}>
                    <Octicons name="x-circle" size={14} color={COLORS.gray} />
                  </Pressable>
                )}
                <FontAwesome5 name="chevron-down" size={14} color={COLORS.gray} />
              </View>
            </TouchableOpacity>
            {form.formState.errors.modelId && (
              <Text className="text-red-500">{form.formState.errors.modelId.message}</Text>
            )}
          </FieldLayout>
          <FieldLayout label="Vị trí để xe">
            <Controller
              control={form.control}
              name="pickupAddress"
              render={({ field }) => (
                <TouchableOpacity onPress={handlePickupAddressPress}>
                  <Input
                    {...field}
                    placeholder="Nhập vị trí để xe"
                    value={field.value || form.watch('pickupAddress')}
                    editable={false}
                    pointerEvents="none"
                  />
                </TouchableOpacity>
              )}
            />
            {form.formState.errors.pickupAddress && (
              <Text className="text-xs text-destructive">
                {form.formState.errors.pickupAddress.message}
              </Text>
            )}
            {form.formState.errors.pickupLatitude && (
              <Text className="text-xs text-destructive">
                {form.formState.errors.pickupLatitude.message}
              </Text>
            )}
            {form.formState.errors.pickupLongitude && (
              <Text className="text-xs text-destructive">
                {form.formState.errors.pickupLongitude.message}
              </Text>
            )}
          </FieldLayout>
          <FieldLayout label="Biển số xe">
            <Controller
              control={form.control}
              name="licensePlate"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nhập biển số xe"
                  value={field.value || form.watch('licensePlate')}
                  onChangeText={field.onChange}
                />
              )}
            />
            {form.formState.errors.licensePlate && (
              <Text className="text-xs text-destructive">
                {form.formState.errors.licensePlate.message}
              </Text>
            )}
          </FieldLayout>
          <FieldLayout label="Màu sắc">
            <Controller
              control={form.control}
              name="color"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nhập màu sắc"
                  onChangeText={field.onChange}
                  value={field.value || form.watch('color')}
                />
              )}
            />
            {form.formState.errors.color && (
              <Text className="text-xs text-destructive">
                {form.formState.errors.color.message}
              </Text>
            )}
          </FieldLayout>
        </View>
      </CardBasic>
    </View>
  );
};

export default CarBasicInfo;
