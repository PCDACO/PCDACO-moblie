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
    queryFn: () => {
      console.log('get list fuel');
      FuelService.listFuel(params);
    },
  });

  return { listFuelQuery };
};
