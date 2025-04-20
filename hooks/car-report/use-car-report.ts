import { useMutation, useQuery } from '@tanstack/react-query';

import { CarReportParams, CarReportPayload } from '~/constants/models/car-report.model';
import { QueryKey } from '~/lib/query-key';
import { CarReportService } from '~/services/car-report.service';

export const useCarReportQuery = (params?: Partial<CarReportParams>) => {
  const queryKey = useQuery({
    queryKey: [QueryKey.CarReport.List, params],
    queryFn: () => CarReportService.get.carReport(params),
    enabled: !!params,
  });

  return queryKey;
};

export const useCarReportDetailQuery = (id: string) => {
  const queryKey = useQuery({
    queryKey: [QueryKey.CarReport.Detail, id],
    queryFn: () => CarReportService.get.carReportDetail(id),
  });

  return queryKey;
};

export const useCarReportMutation = () => {
  const createMutation = useMutation({
    mutationKey: [QueryKey.CarReport.Create],
    mutationFn: (data: CarReportPayload) => CarReportService.post.createCarReport(data),
  });

  const patchImageMutation = useMutation({
    mutationKey: [QueryKey.CarReport.PatchImage],
    mutationFn: ({ reportId, file }: { reportId: string; file: File[] }) =>
      CarReportService.patch.imageCarReport(reportId, file),
  });

  return { createMutation, patchImageMutation };
};
