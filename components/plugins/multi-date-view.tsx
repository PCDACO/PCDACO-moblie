import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import { LocaleConfig as CalendarLocaleConfig } from '~/configs/calendar.config';

// Set up locale configuration
(LocaleConfig as any).locales['vi'] = CalendarLocaleConfig.locales['vi'];
(LocaleConfig as any).defaultLocale = CalendarLocaleConfig.defaultLocale;

interface MultiDateViewProps {
  initialDates?: Date[];
  themeColor?: string;
  onDatesSelected?: (dates: Date[]) => void;
  maxSelection?: number;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  disabled?: boolean;
  onMonthChange?: (month: number, year: number) => void;
}

const MultiDateView: React.FC<MultiDateViewProps> = ({
  initialDates = [],
  themeColor = '#3498db',
  onDatesSelected,
  maxSelection,
  minDate,
  maxDate,
  disabledDates = [],
  disabled = false,
  onMonthChange,
}) => {
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});

  // Convert dates to marked dates format
  const getMarkedDates = (dates: Date[], disabled: Date[] = []) => {
    const marked: { [key: string]: any } = {};

    // Mark initial dates
    dates.forEach((date) => {
      const dateString = date.toISOString().split('T')[0];
      marked[dateString] = {
        selected: true,
        selectedColor: themeColor,
      };
    });

    // Mark disabled dates
    disabled.forEach((date) => {
      const dateString = date.toISOString().split('T')[0];
      marked[dateString] = {
        selected: true,
        selectedColor: '#94a3b8', // Gray color for disabled dates
        disabled: true,
      };
    });

    return marked;
  };

  // Initialize marked dates
  useEffect(() => {
    setMarkedDates(getMarkedDates(initialDates, disabledDates));
  }, [initialDates, disabledDates]);

  // Handle date selection
  const onDayPress = (day: { dateString: string }) => {
    // Don't allow any interaction if calendar is disabled
    if (disabled) return;

    const selectedDate = new Date(day.dateString);
    const dateString = day.dateString;

    // Don't allow selection if date is disabled
    if (disabledDates.some((date) => date.toISOString().split('T')[0] === dateString)) {
      return;
    }

    const currentDates = Object.keys(markedDates)
      .filter((date) => !markedDates[date].disabled)
      .map((date) => new Date(date));

    let newDates: Date[] = [...currentDates];

    const dateIndex = newDates.findIndex((date) => date.toISOString().split('T')[0] === dateString);

    if (dateIndex !== -1) {
      // Remove date if already selected
      newDates = newDates.filter((_, index) => index !== dateIndex);
    } else {
      // Add new date
      if (maxSelection && newDates.length >= maxSelection) {
        // Remove oldest date if max selection reached
        newDates = [...newDates.slice(1), selectedDate];
      } else {
        newDates = [...newDates, selectedDate];
      }
    }

    // Sort dates chronologically
    newDates.sort((a, b) => a.getTime() - b.getTime());

    // Update marked dates
    setMarkedDates(getMarkedDates(newDates, disabledDates));
    onDatesSelected?.(newDates);
  };

  return (
    <View className="rounded-lg border border-muted bg-white p-1 dark:bg-slate-800">
      <Calendar
        markingType="multi-dot"
        markedDates={markedDates}
        onDayPress={onDayPress}
        minDate={minDate?.toISOString()}
        maxDate={maxDate?.toISOString()}
        disabledByDefault={disabled}
        onMonthChange={(month: { month: number; year: number }) => {
          if (onMonthChange) {
            onMonthChange(month.month, month.year);
          }
        }}
      />
    </View>
  );
};

export default MultiDateView;
