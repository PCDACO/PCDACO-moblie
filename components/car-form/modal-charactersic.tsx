import React from 'react';
import { Controller } from 'react-hook-form';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import IconField from './icon-field';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import { useCarForm } from '~/hooks/car/use-car-form';
import { useFuelQuery } from '~/hooks/fuel';
import { useTransmissionQuery } from '~/hooks/transmission/use-transmission';
import Automatic from '~/lib/icons/Automatic';
import FilePDF from '~/lib/icons/FilePDF';
import FuelConsumption from '~/lib/icons/FuelConsumption';
import { Fuel, Armchair, Snowflake, Wifi, Briefcase } from '~/lib/icons/icon';

interface ModalCharactersicProps {
  form: ReturnType<typeof useCarForm>['form'];
}

const ModalCharactersic: React.FC<ModalCharactersicProps> = ({ form }) => {
  // const { form } = useCarForm();
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const { listFuelQuery } = useFuelQuery({ params: { index: 1, size: 50 } });
  const { transmissionQuery } = useTransmissionQuery({ params: { index: 1, size: 50 } });

  const renderTransmission = () => {
    return (
      <Controller
        control={form.control}
        name="transmissionTypeId"
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="flex-row gap-4 border border-input bg-background px-6 py-3">
            {transmissionQuery.data?.value.items?.map((item) => (
              <View key={item.id} className="flex-row items-center gap-2">
                <RadioGroupItem value={item.id}>{item.name}</RadioGroupItem>
                <Label className="text-lg">{item.name}</Label>
              </View>
            ))}
          </RadioGroup>
        )}
      />
    );
  };

  const renderFuel = () => {
    return (
      <Controller
        control={form.control}
        name="fuelTypeId"
        render={({ field }) => (
          <Select
            onValueChange={(item) => {
              field.onChange(item?.value);
            }}
            defaultValue={field.value as any}>
            <SelectTrigger className="w-auto">
              <SelectValue
                className="native:text-lg text-sm text-foreground"
                placeholder="Chọn nhiên liệu"
              />
            </SelectTrigger>
            <SelectContent insets={contentInsets} className="w-[250px]">
              <SelectGroup>
                <SelectLabel>Nhiên liệu sử dụng</SelectLabel>
                {listFuelQuery.data?.value.items?.map((item) => (
                  <SelectItem key={item.id} value={item.id} label={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    );
  };

  return (
    <View className="flex-row flex-wrap gap-2">
      <IconField
        className="w-full"
        icon={<Fuel className="text-muted-foreground" size={20} />}
        label="Nhiên liệu"
        children={renderFuel()}
      />
      {form.formState.errors.fuelTypeId && (
        <Text className="text-xs text-destructive">{form.formState.errors.fuelTypeId.message}</Text>
      )}
      <IconField
        className="w-full"
        icon={<FuelConsumption width={20} height={20} />}
        label="Nhiên liệu"
        children={
          <Controller
            control={form.control}
            name="fuelConsumption"
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  value={field.value?.toString()}
                  keyboardType="numeric"
                  placeholder="Số nhiên liêu tiêu thụ"
                  onChangeText={(text) => {
                    field.onChange(Number(text));
                  }}
                />
              );
            }}
          />
        }
      />
      {form.formState.errors.fuelConsumption && (
        <Text className="text-xs text-destructive">
          {form.formState.errors.fuelConsumption.message}
        </Text>
      )}
      <IconField
        className="w-full"
        icon={<Armchair className="text-muted-foreground" size={20} />}
        label="Số chỗ ngồi"
        children={
          <Controller
            control={form.control}
            name="seat"
            render={({ field }) => {
              return (
                <Input
                  value={field.value?.toString()}
                  className=""
                  keyboardType="numeric"
                  placeholder="Số ghế"
                  onChangeText={(text) => {
                    field.onChange(Number(text));
                  }}
                />
              );
            }}
          />
        }
      />
      {form.formState.errors.seat && (
        <Text className="text-xs text-destructive">{form.formState.errors.seat.message}</Text>
      )}
      {/* <IconField icon={<Snowflake className="text-muted-foreground" size={20} />} label="AC" /> */}
      {/* <IconField icon={<Wifi className="text-muted-foreground" size={20} />} label="Wifi" /> */}
      {/* <IconField
        icon={<Briefcase className="text-muted-foreground" size={20} />}
        label="Cốp chứa rộng"
      /> */}
      <IconField
        icon={<Automatic width={20} height={20} />}
        label="Hộp số tự động"
        children={renderTransmission()}
      />
      {form.formState.errors.transmissionTypeId && (
        <Text className="text-xs text-destructive">
          {form.formState.errors.transmissionTypeId.message}
        </Text>
      )}
      <IconField
        icon={<FilePDF className="text-muted-foreground" width={20} height={20} />}
        label="Giấy tờ xe"
        children={
          <Controller
            control={form.control}
            name="requiresCollateral"
            render={({ field }) => {
              return (
                <View className="bg-background p-3">
                  <Checkbox
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                    {...field}
                  />
                </View>
              );
            }}
          />
        }
      />

      {form.formState.errors.requiresCollateral && (
        <Text className="text-xs text-destructive">
          {form.formState.errors.requiresCollateral.message}
        </Text>
      )}
    </View>
  );
};

export default ModalCharactersic;
