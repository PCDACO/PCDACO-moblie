import * as Location from 'expo-location';
import React, { FunctionComponent } from 'react';
import { Controller } from 'react-hook-form';
import { ToastAndroid, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ModelSuggestionPopover from './model-suggestion-popover';

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
import { ModelsResponse } from '~/constants/models/model.model';
import { useCarForm } from '~/hooks/car/use-car-form';
import { useFuelQuery } from '~/hooks/fuel/use-fuel';
import { useModelQuery } from '~/hooks/models/use-model';
import useDebounce from '~/hooks/plugins/use-debounce';
import { useTransmissionQuery } from '~/hooks/transmission/use-transmission';

interface CarBasicInfoProps {
  form: ReturnType<typeof useCarForm>['form'];
}

const CarBasicInfo: FunctionComponent<CarBasicInfoProps> = ({ form }) => {
  const [location, setLocation] = React.useState<Location.LocationObject | null>(null);
  const [searchModel, setSearchModel] = React.useState<string>('');
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const searchModelDebounce = useDebounce(searchModel, 500);

  // fetch data
  const { data: modelData, isLoading: isLoadingModel } = useModelQuery({
    params: { index: 1, size: 50, keyword: searchModelDebounce },
  });

  const { data: transmissionData, isLoading: isLoadingTransmission } = useTransmissionQuery({
    params: { index: 1, size: 50 },
  });

  const { data: fuelData, isLoading: isLoadingFuel } = useFuelQuery({
    params: { index: 1, size: 50 },
  });

  // insets
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  // get current location
  React.useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        ToastAndroid.show('Xin hãy cấp quyền truy cập vị trí', ToastAndroid.SHORT);
        return;
      }

      const response = await Location.getCurrentPositionAsync({});
      setLocation(response);
    }

    getCurrentLocation();
  }, []);

  React.useEffect(() => {
    if (form.watch('modelId')) {
      setSearchModel(
        modelData?.value.items.find((item) => item.id === form.watch('modelId'))?.name || ''
      );
    }
  }, [form.watch('modelId')]);

  const handleModelSelect = (model: ModelsResponse) => {
    setSearchModel(model.name);
    form.setValue('modelId', model.id);
    setShowSuggestions(false);
  };

  return (
    <View className="gap-4 bg-white px-2 pt-4 dark:bg-gray-900">
      {/* form car basic info */}
      <Subtitle title="Thông tin xe" />
      <View className="gap-4">
        {/* need fix */}
        <FieldLayout label="Mẫu xe">
          <View className="relative">
            <Input
              value={searchModel}
              className="text-sm"
              placeholder="Nhập mẫu xe"
              onChangeText={(text) => {
                setSearchModel(text);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
            />
            <ModelSuggestionPopover
              isLoading={isLoadingModel}
              suggestions={modelData?.value.items || []}
              onSelect={handleModelSelect}
              visible={showSuggestions}
            />
          </View>

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
                value={field.value || form.watch('pickupAddress')}
                onChangeText={(text) => {
                  field.onChange(text);
                  form.setValue('pickupLatitude', location?.coords.latitude || 0);
                  form.setValue('pickupLongitude', location?.coords.longitude || 0);
                }}
              />
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
                defaultValue={(field.value as any) || form.watch('transmissionTypeId')}>
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
                defaultValue={(field.value.toString() as any) || form.watch('fuelTypeId')}>
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
                  value={field.value?.toString() || '' || form.watch('fuelConsumption').toString()}
                  onChangeText={(text) => {
                    if (text === '') {
                      field.onChange(0);
                    } else {
                      field.onChange(Number(text));
                    }
                  }}
                  keyboardType="numeric"
                  inputMode="numeric"
                  returnKeyType="done"
                />
              )}
            />
            {form.formState.errors.fuelConsumption && (
              <Text className="text-xs text-destructive">
                {form.formState.errors.fuelConsumption.message}
              </Text>
            )}
          </FieldLayout>

          <FieldLayout label="Số ghế">
            <Controller
              control={form.control}
              name="seat"
              render={({ field }) => (
                <Select
                  onValueChange={(item) => {
                    field.onChange(Number(item?.value));
                  }}
                  defaultValue={(field.value as any) || form.watch('seat').toString()}>
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
