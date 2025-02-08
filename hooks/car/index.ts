import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

import {
  CarAmenitiesPayload,
  CarImagesPayload,
  CarParams,
  CarPayload,
} from '~/constants/models/car';
import { QueryKey } from '~/lib/query-key';
import { CarService } from '~/services/car';

interface CarProps {
  params?: CarParams;
  id?: string;
}

export const useCar = ({ params, id }: CarProps) => {
  const queryClient = new QueryClient();

  if (!id) {
    throw new Error('ID is required');
  }

  const listQuery = useQuery({
    queryKey: [QueryKey.CAR_LIST, params ? params : {}],
    queryFn: () => CarService.get.list(params),
  });

  const detailQuery = useQuery({
    queryKey: [QueryKey.CAR_DETAIL, id],
    queryFn: () => CarService.get.detail(id),
  });

  const createMutation = useMutation({
    mutationKey: [QueryKey.CAR_CREATE],
    mutationFn: (payload: CarPayload) => CarService.post.car(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKey.CAR_LIST });
    },
  });

  const updateMutation = useMutation({
    mutationKey: [QueryKey.CAR_UPDATE, id],
    mutationFn: (payload: CarPayload) => CarService.put.car(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKey.CAR_LIST });
    },
  });

  const deleteMutation = useMutation({
    mutationKey: [QueryKey.CAR_DELETE, id],
    mutationFn: () => CarService.delete.car(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKey.CAR_LIST });
    },
  });

  const patchImageMutation = useMutation({
    mutationKey: [QueryKey.CAR_PATCH_IMAGE, id],
    mutationFn: (payload: CarImagesPayload) => CarService.patch.carImages(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKey.CAR_DETAIL });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const patchAmenitiesMutation = useMutation({
    mutationKey: [QueryKey.CAR_PATCH_AMENITIES, id],
    mutationFn: (payload: CarAmenitiesPayload) => CarService.patch.carAmenities(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKey.CAR_DETAIL });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    listQuery,
    detailQuery,
    createMutation,
    updateMutation,
    deleteMutation,
    patchImageMutation,
    patchAmenitiesMutation,
  };
};
