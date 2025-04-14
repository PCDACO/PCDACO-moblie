import { FunctionComponent } from 'react';
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
import CardBasic from '~/components/plugins/card-basic';
import Subtitle from '~/components/screens/car-editor/subtitle';
import { useCarForm } from '~/hooks/car/use-car-form';
import { useFuelQuery } from '~/hooks/fuel/use-fuel';
import { useTransmissionQuery } from '~/hooks/transmission/use-transmission';

interface CarSpecificationsProps {
  form: ReturnType<typeof useCarForm>['form'];
}

const CarSpecifications: FunctionComponent<CarSpecificationsProps> = ({ form }) => {
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
    <View className="px-1 py-4">
      {/* form car technical info */}
      <CardBasic>
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
                  <SelectContent
                    insets={contentInsets}
                    className="w-80 bg-slate-50 dark:bg-gray-900">
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
                  <SelectContent
                    insets={contentInsets}
                    className="w-80 bg-slate-50 dark:bg-gray-900">
                    <SelectGroup>
                      <SelectLabel>Nhiên liệu sử dụng</SelectLabel>
                      {isLoadingFuel || !fuelData ? (
                        <SelectItem label="Loading" value="">
                          Loading...
                        </SelectItem>
                      ) : (
                        fuelData?.value.items?.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.id}
                            label={item.name}
                            className="data-[state=checked]:bg-blue-100 dark:data-[state=checked]:bg-blue-900">
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

          <View className="flex-row justify-between gap-2">
            <View className="flex-1">
              <FieldLayout label="Tiêu thụ (L/100km)">
                <Controller
                  control={form.control}
                  name="fuelConsumption"
                  render={({ field }) => (
                    <Input
                      classNameLayout="w-[200px]"
                      {...field}
                      placeholder="Nhập tiêu thụ (L/100km)"
                      value={
                        field.value?.toString() || '' || form.watch('fuelConsumption').toString()
                      }
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
            </View>

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
                    <SelectTrigger className="w-28 bg-white dark:bg-gray-900">
                      <SelectValue placeholder="Chọn số ghế" />
                    </SelectTrigger>
                    <SelectContent
                      insets={{
                        top: 10,
                        bottom: 200,
                        left: 5,
                        right: 1,
                      }}
                      className="bg-slate-50 dark:bg-gray-900">
                      <SelectGroup>
                        <SelectLabel>Số ghế</SelectLabel>
                        {[4, 5, 6, 7, 9].map((item) => (
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
                <Text className="text-xs text-destructive">
                  {form.formState.errors.seat.message}
                </Text>
              )}
            </FieldLayout>
          </View>
        </View>
      </CardBasic>
    </View>
  );
};

export default CarSpecifications;
