import { useQuery } from '@tanstack/react-query';

import { TransmissionService } from '~/services/transmission';

interface ITransmissionQuery {
  params?: RootRequest;
}

export const useTransmissionQuery = ({ params }: ITransmissionQuery) => {
  const transmissionQuery = useQuery({
    queryKey: ['transmission', params],
    queryFn: async () => await TransmissionService.listTransmissions(params),
  });

  return { transmissionQuery };
};
