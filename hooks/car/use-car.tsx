import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { ToastAndroid } from 'react-native';

import {
  CarAvailabilityPayload,
  CarParams,
  CarPayload,
  CarUnavailableParams,
} from '~/constants/models/car.model';
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
    enabled: !!id,
  });

  return detailQuery;
};

export const useCarUnavailableQuery = ({ id, month, year }: CarUnavailableParams) => {
  const unavailableQuery = useQuery({
    queryKey: [QueryKey.Car.Unavailable, id, month, year],
    queryFn: () => CarService.get.unavailable({ id, month, year }),
    enabled: !!id && !!month && !!year,
  });

  return unavailableQuery;
};

export const useCarContactQuery = ({ id }: { id: string }) => {
  const contactQuery = useQuery({
    queryKey: [QueryKey.Car.Contact, id],
    queryFn: () => CarService.get.contact(id),
    enabled: !!id,
  });

  return contactQuery;
};

interface UseCarQueriesParams {
  id: string;
  month: number;
  year: number;
}

export const useCarQueries = ({ id, month, year }: UseCarQueriesParams) => {
  const [detailQuery, unavailableQuery, contactQuery] = useQueries({
    queries: [
      {
        queryKey: [QueryKey.Car.Detail, id],
        queryFn: () => CarService.get.detail(id),
        enabled: !!id,
      },
      {
        queryKey: [QueryKey.Car.Unavailable, id, month, year],
        queryFn: () => CarService.get.unavailable({ id, month, year }),
        enabled: !!id && !!month && !!year,
      },
      {
        queryKey: [QueryKey.Car.Contact, id],
        queryFn: async () => {
          const response = await CarService.get.contact(id);
          return response || null;
        },
        enabled: !!id,
      },
    ],
  });

  return { detailQuery, unavailableQuery, contactQuery };
};

export const useCarMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationKey: [QueryKey.Car.Create],
    mutationFn: async (payload: CarPayload) => await CarService.post.car(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Car.List] });
    },
    onError: () => {
      ToastAndroid.show('Tạo xe thất bại', ToastAndroid.SHORT);
    },
  });

  const postAvailabilityMutation = useMutation({
    mutationKey: [QueryKey.Car.PostAvailability],
    mutationFn: async ({ id, payload }: { payload: CarAvailabilityPayload; id: string }) =>
      await CarService.post.availability(id, payload),
  });

  const postDisableMutation = useMutation({
    mutationKey: [QueryKey.Car.PostDisable],
    mutationFn: async (id: string) => await CarService.post.disable(id),
  });

  const postAssignContractMutation = useMutation({
    mutationKey: [QueryKey.Car.AssignContract],
    mutationFn: async (id: string) => await CarService.post.assign_contract(id),
  });

  const postEnableMutation = useMutation({
    mutationKey: [QueryKey.Car.PostEnable],
    mutationFn: async (id: string) => await CarService.post.enable(id),
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
      ToastAndroid.show('Xóa xe thành công', ToastAndroid.SHORT);
    },
    onError: (error) => {
      console.log(error);
      ToastAndroid.show('Xóa xe thất bại', ToastAndroid.SHORT);
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
    mutationFn: async ({ payload, id }: { payload: File[]; id: string }) =>
      await CarService.patch.paperImages(id, payload),
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
    postAvailabilityMutation,
    postDisableMutation,
    postEnableMutation,
    postAssignContractMutation,
  };
};
