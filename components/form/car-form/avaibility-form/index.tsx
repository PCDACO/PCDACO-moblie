import React from 'react';
import { Controller } from 'react-hook-form';
import { View, Text } from 'react-native';

import CardBasic from '~/components/plugins/card-basic';
import MultiDatePicker from '~/components/plugins/multi-date-select';
import { useCarAvalibilityForm } from '~/hooks/car/use-car-avalibility';
import { COLORS } from '~/theme/colors';

interface CarAvailabilityFormProps {
  form: ReturnType<typeof useCarAvalibilityForm>['form'];
}

export const CarAvailabilityForm = ({ form }: CarAvailabilityFormProps) => {
  return (
    <CardBasic className="gap-4">
      <View className="gap-2">
        <Text className="text-base font-medium">Chọn ngày không khả dụng</Text>
        <Text className="text-sm text-gray-500">Chọn những ngày bạn không muốn cho thuê xe</Text>
      </View>

      <Controller
        control={form.control}
        name="dates"
        render={({ field }) => (
          <View className="gap-2">
            <MultiDatePicker
              initialDates={field.value?.map((date) => new Date(date)) || []}
              themeColor={COLORS.light.primary}
              onDatesSelected={(dates) => {
                field.onChange(dates.map((date) => date.toISOString()));
              }}
              minDate={new Date()}
            />
            {form.formState.errors.dates && (
              <Text className="text-sm text-primary">{form.formState.errors.dates.message}</Text>
            )}
          </View>
        )}
      />
    </CardBasic>
  );
};
