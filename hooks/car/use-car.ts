import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { ToastAndroid } from 'react-native';

import {
  CarAvailabilityPayload,
  CarParams,
  CarPayload,
  CarUnavailableParams,
} from '~/constants/models/car.model';
import { QueryKey } from '~/lib/query-key';
import { translate } from '~/lib/translate';
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
        retry: 1,
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
    mutationFn: async ({ id, signature }: { id: string; signature: string }) =>
      await CarService.post.assign_contract(id, signature),
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
      ToastAndroid.show(translate.cars.toast.update, ToastAndroid.SHORT);
    },
    onError: (error: any) => {
      ToastAndroid.show(
        error.response.data.message || translate.cars.toast.error_update,
        ToastAndroid.SHORT
      );
    },
  });

  const deleteMutation = useMutation({
    mutationKey: [QueryKey.Car.Delete],
    mutationFn: async (id: string) => await CarService.delete.car(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Car.List] });
      ToastAndroid.show(response.message || translate.cars.toast.delete, ToastAndroid.SHORT);
    },
    onError: (error: any) => {
      ToastAndroid.show(
        error.response.data.message || translate.cars.toast.error_delete,
        ToastAndroid.SHORT
      );
    },
  });

  const patchImageMutation = useMutation({
    mutationKey: [QueryKey.Car.PatchImage],
    mutationFn: async ({ payload, id }: { payload: File[]; id: string }) =>
      await CarService.patch.carImages(id, payload),
  });

  const patchPaperImageMutation = useMutation({
    mutationKey: [QueryKey.Car.PatchPaperImage],
    mutationFn: async ({ payload, id }: { payload: File[]; id: string }) =>
      await CarService.patch.paperImages(id, payload),
  });

  const patchAmenitiesMutation = useMutation({
    mutationKey: [QueryKey.Car.PatchAmenities],
    mutationFn: async ({ payload, id }: { payload: { amenityId: string[] }; id: string }) =>
      await CarService.patch.carAmenities(id, payload),
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
