import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '~/lib/query-key';
import { AmenityService } from '~/services/amentity.service';

interface UseAmenitiesProps {
  params: Partial<RootRequest>;
}

export const useAmenities = ({ params }: UseAmenitiesProps) => {
  const listAmenitiesQuery = useQuery({
    queryKey: [QueryKey.Amenity.List, params],
    queryFn: () => AmenityService.get.list(params),
    staleTime: 1000 * 60 * 2,
    enabled: true,
    retry: 2,
  });

  return listAmenitiesQuery;
};
