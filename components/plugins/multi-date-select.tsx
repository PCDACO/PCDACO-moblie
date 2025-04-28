import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import { LocaleConfig as CalendarLocaleConfig } from '~/configs/calendar.config';

// Set up locale configuration
(LocaleConfig as any).locales['vi'] = CalendarLocaleConfig.locales['vi'];
(LocaleConfig as any).defaultLocale = CalendarLocaleConfig.defaultLocale;

interface MultiDatePickerProps {
  initialDates?: Date[];
  themeColor?: string;
  onDatesSelected?: (dates: Date[]) => void;
  minDate?: Date;
}

const MultiDatePicker: React.FC<MultiDatePickerProps> = ({
  initialDates = [],
  themeColor = '#3498db',
  onDatesSelected,
  minDate,
}) => {
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});

  // Convert dates to marked dates format
  const getMarkedDates = (dates: Date[]) => {
    const marked: { [key: string]: any } = {};
    dates?.forEach((date) => {
      if (date) {
        const dateString = date.toISOString().split('T')[0];
        marked[dateString] = {
          selected: true,
          selectedColor: themeColor,
          marked: true,
          dotColor: themeColor,
        };
      }
    });
    return marked;
  };

  // Initialize marked dates
  useEffect(() => {
    setMarkedDates(getMarkedDates(initialDates));
  }, [initialDates]);

  // Handle date selection
  const onDayPress = (day: { dateString: string }) => {
    const selectedDate = new Date(day.dateString);
    const dateString = day.dateString;

    const currentDates = Object.keys(markedDates).map((date) => new Date(date));
    let newDates: Date[] = [...currentDates];

    const dateIndex = newDates.findIndex((date) => date.toISOString().split('T')[0] === dateString);

    if (dateIndex !== -1) {
      // Remove date if already selected
      newDates = newDates.filter((_, index) => index !== dateIndex);
    } else {
      // Add new date
      newDates = [...newDates, selectedDate];
    }

    // Sort dates chronologically
    newDates.sort((a, b) => a.getTime() - b.getTime());

    // Update marked dates
    setMarkedDates(getMarkedDates(newDates));
    onDatesSelected?.(newDates);
  };

  return (
    <View className="rounded-lg border border-muted bg-white p-1 dark:bg-slate-800">
      <Calendar
        markingType="dot"
        markedDates={markedDates}
        onDayPress={onDayPress}
        minDate={minDate?.toISOString().split('T')[0]}
      />
    </View>
  );
};

export default MultiDatePicker;
