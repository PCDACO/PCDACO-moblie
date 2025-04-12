import { MarkedDates } from 'react-native-calendars/src/types';

import { InspectionScheduleReponse } from '~/constants/models/schedule.model';

export function getMarkedDates(items: InspectionScheduleReponse[] = []) {
  const marked: MarkedDates = {};

  items.forEach((item) => {
    if (item.inspectionDate) {
      const date = new Date(item.inspectionDate);
      const dateString = date.toISOString().split('T')[0];
      marked[dateString] = { marked: true };
    }
  });

  return marked;
}
