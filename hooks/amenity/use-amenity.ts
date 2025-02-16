import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { QueryKey } from '~/lib/query-key';
import { AmenityService } from '~/services/amentity';

interface UseAmenitiesProps {
  params: RootRequest;
}

export const useAmenities = ({ params }: UseAmenitiesProps) => {
  const listAmenitiesQuery = useSuspenseQuery({
    queryKey: [QueryKey.AMENITIES_LIST, params],
    queryFn: () => AmenityService.get.list(params),
    staleTime: 1000 * 60 * 2,
    // enabled: true,
    retry: 2,
  });

  return { listAmenitiesQuery };
};
