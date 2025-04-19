import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AgendaList, CalendarProvider, DateData, ExpandableCalendar } from 'react-native-calendars';
import XDate from 'xdate';

import AgendaItem from '~/components/screens/schedule/mocks/agenda-item';
import { getMarkedDates } from '~/components/screens/schedule/mocks/agenda-items';
import { getTheme, lightThemeColor, themeColor } from '~/components/screens/schedule/mocks/theme';
import ScheduleSkeleton from '~/components/screens/schedule/schedule-skeleton';
import { InspectionScheduleReponse } from '~/constants/models/schedule.model';
import { useScheduleListQuery } from '~/hooks/schedule/use-schedule';

const SchedulesScreen = () => {
  const [month, setMonth] = React.useState<number>(4);
  const [year, setYear] = React.useState<number>(2025);
  const [isRefetching, setIsRefetching] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<string>(() => {
    const date = new Date();
    date.setMonth(month - 1);
    date.setFullYear(year);
    return date.toISOString().split('T')[0];
  });

  const {
    data: scheduleList,
    isLoading,
    refetch,
  } = useScheduleListQuery({
    month,
    year,
  });

  const inspectionSchedules = scheduleList?.value || [];

  const marked = React.useRef(getMarkedDates(inspectionSchedules));
  const theme = React.useRef(getTheme());

  const renderItem = React.useCallback(({ item }: { item: InspectionScheduleReponse }) => {
    return (
      <View className="px-2">
        <AgendaItem inspectionSchedule={item} />
      </View>
    );
  }, []);

  const calendarRef = React.useRef<{ toggleCalendarPosition: () => boolean }>(null);
  const rotation = React.useRef(new Animated.Value(0));
  const todayBtnTheme = React.useRef({
    todayButtonTextColor: themeColor,
  });

  const handleRefresh = React.useCallback(async () => {
    try {
      setIsRefetching(true);
      await refetch();
    } finally {
      setIsRefetching(false);
    }
  }, [refetch]);

  const toggleCalendarExpansion = React.useCallback(() => {
    const isOpen = calendarRef.current?.toggleCalendarPosition();
    Animated.timing(rotation.current, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, []);

  const handleMonthChange = React.useCallback((date: DateData) => {
    const newDate = new Date(date.dateString);
    const newMonth = newDate.getMonth() + 1;
    const newYear = newDate.getFullYear();

    setMonth(newMonth);
    setYear(newYear);
    setSelectedDate(date.dateString);
  }, []);

  const renderHeader = React.useCallback(
    (date?: XDate) => {
      return (
        <TouchableOpacity style={styles.header} onPress={toggleCalendarExpansion}>
          <Text style={styles.headerTitle}>{date?.toString('MMMM yyyy')}</Text>
        </TouchableOpacity>
      );
    },
    [toggleCalendarExpansion]
  );

  // Transform inspection schedules into sections format required by AgendaList
  const sections = React.useMemo(() => {
    const groupedSchedules = inspectionSchedules.reduce(
      (acc, schedule) => {
        if (!schedule.inspectionDate) return acc;

        const date = new Date(schedule.inspectionDate);
        const dateString = date.toISOString().split('T')[0];

        if (!acc[dateString]) {
          acc[dateString] = [];
        }
        acc[dateString].push(schedule);
        return acc;
      },
      {} as Record<string, InspectionScheduleReponse[]>
    );

    return Object.entries(groupedSchedules).map(([date, data]) => ({
      title: date,
      data,
    }));
  }, [inspectionSchedules]);

  const calendarProps = {
    ref: calendarRef,
    theme: theme.current,
    markedDates: marked.current,
    renderHeader,
    style: styles.calendar,
    firstDay: 1,
    hideArrows: false,
    hideExtraDays: true,
    disableMonthChange: false,
    disableWeekScroll: false,
    disableAllTouchEventsForDisabledDays: true,
    enableSwipeMonths: true,
    onMonthChange: handleMonthChange,
  };

  return (
    <CalendarProvider date={selectedDate} theme={todayBtnTheme.current}>
      <ExpandableCalendar {...calendarProps} />
      <AgendaList
        sections={sections}
        renderItem={renderItem}
        sectionStyle={styles.section}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={
          isLoading ? (
            <ScheduleSkeleton />
          ) : (
            <View style={styles.emptyContainer}>
              <Feather name="calendar" size={40} color="gray" />
              <Text style={styles.emptyText}>Không có lịch kiểm định trong tháng này</Text>
            </View>
          )
        }
      />
    </CalendarProvider>
  );
};

export default SchedulesScreen;

const styles = StyleSheet.create({
  calendar: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 6,
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    gap: 10,
  },
  emptyText: {
    width: '50%',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
});
