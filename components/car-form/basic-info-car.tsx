import React from 'react';
import { Controller } from 'react-hook-form';
import { View, Text } from 'react-native';

import { ModelCarPicker } from './model-car-picker';
import PickerImageCar from './picker-image-car';
import FieldLayout from '../layout/field-layout';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

import { useCarForm } from '~/hooks/car/use-car-form';

interface BasicInfoCarProps {
  form: ReturnType<typeof useCarForm>['form'];
}

const BasicInfoCar: React.FC<BasicInfoCarProps> = ({ form }) => {
  return (
    <View className="mb-10 gap-4">
      <FieldLayout label="Hình ảnh">
        <PickerImageCar form={form} />
      </FieldLayout>
      <FieldLayout label="Tên xe">
        <Controller
          control={form.control}
          name="modelId"
          render={({ field }) => <ModelCarPicker field={field} />}
        />
        {form.formState.errors.modelId && (
          <Text className="text-xs text-destructive">{form.formState.errors.modelId.message}</Text>
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
      <FieldLayout label="Giá thuê 1 ngày" required>
        <Controller
          control={form.control}
          name="price"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Nhập giá thuê"
              value={field.value?.toString()}
              onChangeText={(text) => {
                field.onChange(Number(text));
              }}
              keyboardType="numeric"
            />
          )}
        />
        {form.formState.errors.price && (
          <Text className="text-xs text-destructive">{form.formState.errors.price.message}</Text>
        )}
      </FieldLayout>
      <FieldLayout label="Mô tả">
        <Controller
          control={form.control}
          name="description"
          render={({ field }) => (
            <Textarea
              // {...field}
              placeholder="Nhập mô tả"
              numberOfLines={6}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        {form.formState.errors.description && (
          <Text className="text-xs text-destructive">
            {form.formState.errors.description.message}
          </Text>
        )}
      </FieldLayout>
    </View>
  );
};

export default BasicInfoCar;
