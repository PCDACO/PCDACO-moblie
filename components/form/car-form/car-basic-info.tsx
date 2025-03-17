import React, { FunctionComponent } from 'react';
import { Controller } from 'react-hook-form';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FieldLayout from '~/components/layouts/field-layout';
import { Input } from '~/components/layouts/input-with-icon';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/nativewindui/Select';
import Subtitle from '~/components/screens/car-editor/subtitle';
import { useCarForm } from '~/hooks/car/use-car-form';
import { useFuelQuery } from '~/hooks/fuel/use-fuel';
import { useTransmissionQuery } from '~/hooks/transmission/use-transmission';

interface CarBasicInfoProps {
  form: ReturnType<typeof useCarForm>['form'];
}

const CarBasicInfo: FunctionComponent<CarBasicInfoProps> = ({ form }) => {
  const { data: transmissionData, isLoading: isLoadingTransmission } = useTransmissionQuery({
    params: { index: 1, size: 50 },
  });
  const { data: fuelData, isLoading: isLoadingFuel } = useFuelQuery({
    params: { index: 1, size: 50 },
  });

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <View className="gap-4">
      {/* form car basic info */}
      <Subtitle title="Thông tin xe" />
      <View className="gap-4">
        {/* need fix */}
        <FieldLayout label="Mẫu xe">
          <Input className="text-sm" placeholder="Nhập mẫu xe" />
          {form.formState.errors.modelId && (
            <Text className="text-red-500">{form.formState.errors.modelId.message}</Text>
          )}
        </FieldLayout>
        <FieldLayout label="Vị trí để xe">
          <Controller
            control={form.control}
            name="pickupAddress"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập vị trí để xe"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
        </FieldLayout>
        <FieldLayout label="Biển số xe">
          <Controller
            control={form.control}
            name="licensePlate"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập biển số xe"
                value={field.value?.toUpperCase()}
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
                value={field.value}
              />
            )}
          />
          {form.formState.errors.color && (
            <Text className="text-xs text-destructive">{form.formState.errors.color.message}</Text>
          )}
        </FieldLayout>
      </View>

      {/* form car technical info */}
      <Subtitle title="Thông số kỹ thuật" />
      <View className="gap-4">
        <FieldLayout label="Hộp số">
          <Controller
            control={form.control}
            name="transmissionTypeId"
            render={({ field }) => (
              <Select
                onValueChange={(item) => {
                  field.onChange(item?.value);
                }}
                defaultValue={field.value as any}>
                <SelectTrigger className="bg-white dark:bg-gray-900">
                  <SelectValue placeholder="Chọn hộp số" />
                </SelectTrigger>
                <SelectContent insets={contentInsets} className="w-80 bg-slate-50 dark:bg-gray-900">
                  {isLoadingTransmission || !transmissionData ? (
                    <SelectItem label="Loading" value="">
                      Loading...
                    </SelectItem>
                  ) : (
                    transmissionData?.value.items?.map((item) => (
                      <SelectItem key={item.id} value={item.id} label={item.name} />
                    ))
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {form.formState.errors.transmissionTypeId && (
            <Text className="text-xs text-destructive">
              {form.formState.errors.transmissionTypeId.message}
            </Text>
          )}
        </FieldLayout>
        <FieldLayout label="Nhiên liệu">
          <Controller
            control={form.control}
            name="fuelTypeId"
            render={({ field }) => (
              <Select
                onValueChange={(item) => {
                  field.onChange(item?.value);
                }}
                defaultValue={field.value as any}>
                <SelectTrigger className="bg-white dark:bg-gray-900">
                  <SelectValue placeholder="Chọn nhiên liệu" />
                </SelectTrigger>
                <SelectContent insets={contentInsets} className="w-80 bg-slate-50 dark:bg-gray-900">
                  <SelectGroup>
                    <SelectLabel>Nhiên liệu sử dụng</SelectLabel>
                    {isLoadingFuel || !fuelData ? (
                      <SelectItem label="Loading" value="">
                        Loading...
                      </SelectItem>
                    ) : (
                      fuelData?.value.items?.map((item) => (
                        <SelectItem key={item.id} value={item.id} label={item.name}>
                          {item.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {form.formState.errors.fuelTypeId && (
            <Text className="text-xs text-destructive">
              {form.formState.errors.fuelTypeId.message}
            </Text>
          )}
        </FieldLayout>
        <View className="flex-row justify-between">
          <FieldLayout label="Tiêu thụ (L/100km)">
            <Controller
              control={form.control}
              name="fuelConsumption"
              render={({ field }) => (
                <Input
                  classNameLayout="w-[200px]"
                  {...field}
                  placeholder="Nhập tiêu thụ (L/100km)"
                  value={field.value?.toString() || ''}
                  onChangeText={field.onChange}
                  keyboardType="numeric"
                />
              )}
            />
            {form.formState.errors.seat && (
              <Text className="text-xs text-destructive">{form.formState.errors.seat.message}</Text>
            )}
          </FieldLayout>
          <FieldLayout label="Số ghế">
            <Controller
              control={form.control}
              name="seat"
              render={({ field }) => (
                <Select
                  onValueChange={(item) => {
                    field.onChange(item?.value);
                  }}
                  defaultValue={field.value as any}>
                  <SelectTrigger className="w-32 bg-white dark:bg-gray-900">
                    <SelectValue placeholder="Chọn số ghế" />
                  </SelectTrigger>
                  <SelectContent
                    insets={{
                      top: 10,
                      bottom: 200,
                      left: 5,
                      right: 1,
                    }}
                    className="w-8 bg-slate-50 dark:bg-gray-900">
                    <SelectGroup>
                      <SelectLabel>Số ghế</SelectLabel>
                      {[1, 2, 4, 7].map((item) => (
                        <SelectItem key={item} value={item.toString()} label={item.toString()}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {form.formState.errors.seat && (
              <Text className="text-xs text-destructive">{form.formState.errors.seat.message}</Text>
            )}
          </FieldLayout>
        </View>
      </View>
    </View>
  );
};

export default CarBasicInfo;
