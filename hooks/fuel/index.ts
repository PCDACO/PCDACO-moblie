import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '~/lib/query-key';
import { FuelService } from '~/services/fuel';

interface UseFuelProps {
  params?: RootRequest;
}

export const useFuelQuery = ({ params }: UseFuelProps) => {
  if (!params) {
    throw new Error('params is required');
  }

  const listFuelQuery = useQuery({
    queryKey: [QueryKey.FUEL_LIST, params],
    queryFn: () => FuelService.listFuel(params),
    enabled: !!params,
    retry: 1,
  });

  return { listFuelQuery };
};
