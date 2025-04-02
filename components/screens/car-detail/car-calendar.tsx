import React from 'react';
import { View, Text } from 'react-native';

import MultiDatePicker from '~/components/plugins/multi-date-select';

interface CarCalendarProps {
  carId: string;
  unavailableDates: Date[];
}

const CarCalendar: React.FC<CarCalendarProps> = ({ carId, unavailableDates }) => {
  return (
    <View className="p-4">
      <Text className="mb-4 text-lg font-semibold">Thời gian không cho thuê xe</Text>
      <MultiDatePicker
        initialDates={unavailableDates}
        themeColor="#ef4444"
        onDatesSelected={() => {}}
        maxSelection={0}
        minDate={new Date()}
        disabledDates={unavailableDates}
        disabled
      />
    </View>
  );
};

export default CarCalendar;
