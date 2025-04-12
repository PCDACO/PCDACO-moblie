import { useQuery } from '@tanstack/react-query';

import { InspectionScheduleParmas } from '~/constants/models/schedule.model';
import { QueryKey } from '~/lib/query-key';
import { scheduleService } from '~/services/schedule.service';

export const useScheduleListQuery = (params: InspectionScheduleParmas) => {
  return useQuery({
    queryKey: [QueryKey.Schedule.List, params],
    queryFn: () => scheduleService.get.list(params),
    enabled: !!params,
  });
};

export const useScheduleDetailQuery = (id: string) => {
  return useQuery({
    queryKey: [QueryKey.Schedule.Detail, id],
    queryFn: () => scheduleService.get.detail(id),
    enabled: !!id,
  });
};
