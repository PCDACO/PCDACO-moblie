import { useQueries } from '@tanstack/react-query';

import { BookingStatusNumber, CarStatusNumber } from '~/constants/enums';
import { UserResponse } from '~/constants/models/user.model';
import { QueryKey } from '~/lib/query-key';
import { BookService } from '~/services/book.service';
import { CarService } from '~/services/car.service';
import { ReportService } from '~/services/report.service';
import { scheduleService } from '~/services/schedule.service';
import { UserService } from '~/services/user.service';

export const useHomeQueries = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [currentUserQuery, carsQuery, bookingsQuery, scheduleQuery, reportQuery] = useQueries({
    queries: [
      {
        queryKey: [QueryKey.User.Current],
        queryFn: () => UserService.get.current(),
      },
      {
        queryKey: [QueryKey.Car.List],
        queryFn: () =>
          CarService.get.list({
            status: CarStatusNumber.Available,
          }),
      },
      {
        queryKey: [QueryKey.Booking.get.List],
        queryFn: () =>
          BookService.get.list({ index: 1, size: 10, status: [BookingStatusNumber.Pending] }),
      },
      {
        queryKey: [QueryKey.Schedule.List, { month: currentMonth, year: currentYear }],
        queryFn: () =>
          scheduleService.get.list({
            month: currentMonth,
            year: currentYear,
          }),
      },
      {
        queryKey: [QueryKey.Report.List, { params: { index: 1, size: 3 } }],
        queryFn: () => ReportService.get.list({ index: 1, size: 3 }),
      },
    ],
  });

  return {
    user: currentUserQuery.data?.value || ({} as UserResponse),
    cars: carsQuery.data?.value?.items || [],
    bookings: bookingsQuery.data?.value?.items || [],
    schedules: scheduleQuery.data?.value || [],
    reports: reportQuery.data?.value.items || [],
    isLoading:
      carsQuery.isLoading ||
      bookingsQuery.isLoading ||
      scheduleQuery.isLoading ||
      currentUserQuery.isLoading ||
      reportQuery.isLoading,
    refetch: async () => {
      await carsQuery.refetch();
      await bookingsQuery.refetch();
      await scheduleQuery.refetch();
      await currentUserQuery.refetch();
      await reportQuery.refetch();
    },
  };
};
