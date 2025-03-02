import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { ToastAndroid } from 'react-native';

import { CarAmenitiesPayload, CarParams, CarPayload } from '~/constants/models/car';
import { QueryKey } from '~/lib/query-key';
import { CarService } from '~/services/car';

interface CarProps {
  params?: CarParams;
}

export const useCarQuery = ({ params }: CarProps) => {
  const listQuery = useQuery({
    queryKey: [QueryKey.CAR_LIST, params ? params : {}],
    queryFn: () => CarService.get.list(params),
  });

  return {
    listQuery,
  };
};

export const useCarDetailQuery = ({ id }: { id: string }) => {
  const detailQuery = useQuery({
    queryKey: [QueryKey.CAR_DETAIL, id],
    queryFn: () => CarService.get.detail(id),
  });

  return {
    detailQuery,
  };
};

export const useCarMutation = () => {
  const queryClient = new QueryClient();

  const createMutation = useMutation({
    mutationKey: [QueryKey.CAR_CREATE],
    mutationFn: async (payload: CarPayload) => await CarService.post.car(payload),
    onSuccess: (data) => {
      console.log('create data id ', data.value.id);
    },
    onError: (error) => {
      console.log(error);
      ToastAndroid.show('Tạo xe thất bại', ToastAndroid.SHORT);
    },
  });

  const updateMutation = useMutation({
    mutationKey: [QueryKey.CAR_UPDATE],
    mutationFn: async ({ id, payload }: { payload: CarPayload; id: string }) =>
      await CarService.put.car(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKey.CAR_LIST });
      ToastAndroid.show('Cập nhật xe thành công', ToastAndroid.SHORT);
    },
    onError: (error) => {
      console.log(error);
      ToastAndroid.show('Cập nhật xe thất bại', ToastAndroid.SHORT);
    },
  });

  const deleteMutation = useMutation({
    mutationKey: [QueryKey.CAR_DELETE],
    mutationFn: async (id: string) => await CarService.delete.car(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKey.CAR_LIST });
    },
  });

  const patchImageMutation = useMutation({
    mutationKey: [QueryKey.CAR_PATCH_IMAGE],
    mutationFn: async ({ payload, id }: { payload: File[]; id: string }) =>
      await CarService.patch.carImages(id, payload),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: QueryKey.CAR_DETAIL });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const patchPaperImageMutation = useMutation({
    mutationKey: [QueryKey.CAR_PATCH_PAPERS],
    mutationFn: async ({ payload, id }: { payload: File[]; id: string }) =>
      await CarService.patch.paperImages(id, payload),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: QueryKey.CAR_DETAIL });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const patchAmenitiesMutation = useMutation({
    mutationKey: [QueryKey.CAR_PATCH_AMENITIES],
    mutationFn: async ({ payload, id }: { payload: CarAmenitiesPayload; id: string }) =>
      await CarService.patch.carAmenities(id, payload),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: QueryKey.CAR_DETAIL });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    patchImageMutation,
    patchAmenitiesMutation,
    patchPaperImageMutation,
  };
};
