import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { View, Text, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import CardBasic from '~/components/plugins/card-basic';
import MultiDatePicker from '~/components/plugins/multi-date-select';
import { useCarAvalibilityForm } from '~/hooks/car/use-car-avalibility';
import { COLORS } from '~/theme/colors';

interface CarAvailabilityFormProps {
  form: ReturnType<typeof useCarAvalibilityForm>['form'];
}

export const CarAvailabilityForm = ({ form }: CarAvailabilityFormProps) => {
  const knobPosition = useSharedValue(form.getValues('isAvailable') ? 22 : 0);

  useEffect(() => {
    knobPosition.value = withSpring(form.getValues('isAvailable') ? 22 : 0, {
      damping: 15,
      stiffness: 100,
    });
  }, [form.getValues('isAvailable')]);

  const animatedKnobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: knobPosition.value }],
  }));

  return (
    <CardBasic className="gap-4">
      <View className="gap-2">
        <Text className="text-base font-medium">Chọn ngày không khả dụng</Text>
        <Text className="text-sm text-gray-500">Chọn những ngày bạn không muốn cho thuê xe</Text>
      </View>

      <Controller
        control={form.control}
        name="dates"
        render={({ field, fieldState }) => (
          <View className="gap-2">
            <MultiDatePicker
              initialDates={field.value.map((date) => new Date(date))}
              themeColor={COLORS.light.primary}
              onDatesSelected={(dates) => {
                field.onChange(dates.map((date) => date.toISOString()));
              }}
            />
            {fieldState.error && (
              <Text className="text-sm text-red-500">{fieldState.error.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={form.control}
        name="isAvailable"
        render={({ field }) => (
          <View className="flex-row items-center justify-between">
            <Text className="text-base">Trạng thái khả dụng</Text>

            {/* Custom Switch */}
            <Pressable
              onPress={() => {
                const newValue = !field.value;
                field.onChange(newValue);
                knobPosition.value = withSpring(newValue ? 22 : 0, { damping: 15, stiffness: 100 });
              }}
              style={{
                width: 50,
                height: 28,
                borderRadius: 16,
                backgroundColor: field.value ? COLORS.light.primary : '#ccc',
                justifyContent: 'center',
                paddingHorizontal: 4,
              }}>
              <Animated.View
                style={[
                  {
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: 'white',
                  },
                  animatedKnobStyle,
                ]}
              />
            </Pressable>
          </View>
        )}
      />
    </CardBasic>
  );
};
