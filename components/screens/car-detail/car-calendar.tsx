import React from 'react';
import { View, Text } from 'react-native';

import MultiDateView from '~/components/plugins/multi-date-view';

interface CarCalendarProps {
  unavailableDates: Date[];
  onMonthChange: (month: number, year: number) => void;
  isLoading: boolean;
}

const CarCalendar: React.FC<CarCalendarProps> = ({ unavailableDates, onMonthChange }) => {
  const handleMonthChange = (month: number, year: number) => {
    onMonthChange(month, year);
  };

  return (
    <View className="p-4">
      <Text className="mb-4 text-lg font-semibold">Thời gian không cho thuê xe</Text>
      <MultiDateView
        initialDates={unavailableDates}
        themeColor="#ef4444"
        onDatesSelected={() => {}}
        maxSelection={0}
        minDate={new Date()}
        disabledDates={unavailableDates}
        disabled
        onMonthChange={handleMonthChange}
      />
    </View>
  );
};

export default CarCalendar;
