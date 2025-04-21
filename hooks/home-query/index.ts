import { useQueries } from '@tanstack/react-query';

import { QueryKey } from '~/lib/query-key';
import { BookService } from '~/services/book.service';
import { CarService } from '~/services/car.service';
import { scheduleService } from '~/services/schedule.service';

export const useHomeQueries = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [carsQuery, bookingsQuery, scheduleQuery] = useQueries({
    queries: [
      {
        queryKey: [QueryKey.Car.List],
        queryFn: () => CarService.get.list({}),
      },
      {
        queryKey: [QueryKey.Booking.get.List],
        queryFn: () => BookService.get.list({ index: 1, size: 10 }),
      },
      {
        queryKey: [QueryKey.Schedule.List, { month: currentMonth, year: currentYear }],
        queryFn: () => scheduleService.get.list({ month: currentMonth, year: currentYear }),
      },
    ],
  });

  return {
    cars: carsQuery.data?.value?.items || [],
    bookings: bookingsQuery.data?.value?.items || [],
    schedules: scheduleQuery.data?.value || [],
    isLoading: carsQuery.isLoading || bookingsQuery.isLoading || scheduleQuery.isLoading,
    refetch: async () => {
      await carsQuery.refetch();
      await bookingsQuery.refetch();
      await scheduleQuery.refetch();
    },
  };
};
