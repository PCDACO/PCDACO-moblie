import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import * as DocumentPicker from 'expo-document-picker';
import { ToastAndroid } from 'react-native';

import { CarParams, CarPayload } from '~/constants/models/car.model';
import { QueryKey } from '~/lib/query-key';
import { CarService } from '~/services/car.service';

interface CarProps {
  params?: Partial<CarParams>;
}

export const useCarQuery = ({ params }: CarProps) => {
  const listQuery = useQuery({
    queryKey: [QueryKey.Car.List, params ? params : {}],
    queryFn: () => CarService.get.list(params),
    staleTime: 1000,
  });

  return listQuery;
};

export const useCarDetailQuery = ({ id }: { id: string }) => {
  const detailQuery = useQuery({
    queryKey: [QueryKey.Car.Detail, id],
    queryFn: () => CarService.get.detail(id),
  });

  return detailQuery;
};

export const useCarMutation = () => {
  const queryClient = new QueryClient();

  const createMutation = useMutation({
    mutationKey: [QueryKey.Car.Create],
    mutationFn: async (payload: CarPayload) => await CarService.post.car(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Car.List] });
    },
    onError: (error) => {
      console.log(error);
      ToastAndroid.show('Tạo xe thất bại', ToastAndroid.SHORT);
    },
  });

  const updateMutation = useMutation({
    mutationKey: [QueryKey.Car.Update],
    mutationFn: async ({ id, payload }: { payload: CarPayload; id: string }) =>
      await CarService.put.car(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Car.List] });
      ToastAndroid.show('Cập nhật xe thành công', ToastAndroid.SHORT);
    },
    onError: (error) => {
      console.log(error);
      ToastAndroid.show('Cập nhật xe thất bại', ToastAndroid.SHORT);
    },
  });

  const deleteMutation = useMutation({
    mutationKey: [QueryKey.Car.Delete],
    mutationFn: async (id: string) => await CarService.delete.car(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Car.List] });
    },
  });

  const patchImageMutation = useMutation({
    mutationKey: [QueryKey.Car.PatchImage],
    mutationFn: async ({ payload, id }: { payload: File[]; id: string }) =>
      await CarService.patch.carImages(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Car.Detail] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const patchPaperImageMutation = useMutation({
    mutationKey: [QueryKey.Car.PatchPaperImage],
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: DocumentPicker.DocumentPickerAsset[];
      id: string;
    }) => await CarService.patch.paperImages(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Car.Detail] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const patchAmenitiesMutation = useMutation({
    mutationKey: [QueryKey.Car.PatchAmenities],
    mutationFn: async ({ payload, id }: { payload: { amenityId: string[] }; id: string }) =>
      await CarService.patch.carAmenities(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Car.Detail] });
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
