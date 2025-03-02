import { zodResolver } from '@hookform/resolvers/zod';
import { QueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useCarMutation } from './use-car';

import { CarImagesPayload, CarPayload } from '~/constants/models/car';
import { CarPayloadSchema, carSchema } from '~/constants/schemas/car.schema';
import { QueryKey } from '~/lib/query-key';
import useIDStore from '~/stores/store';

export const useCarForm = () => {
  const queryClient = new QueryClient();
  const {
    createMutation,
    updateMutation,
    patchImageMutation,
    patchAmenitiesMutation,
    patchPaperImageMutation,
  } = useCarMutation();
  const { id } = useIDStore();

  const form = useForm<CarPayloadSchema>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      carImages: [],
      paperImages: [],
      modelId: '',
      price: 0,
      licensePlate: '',
      color: '',
      amenityIds: [],
      description: '',
      transmissionTypeId: '',
      fuelTypeId: '',
      seat: 0,
      fuelConsumption: 0,
      requiresCollateral: false,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    const infoPayload: CarPayload = {
      modelId: data.modelId,
      price: data.price,
      licensePlate: data.licensePlate,
      color: data.color,
      amenityIds: data.amenityIds,
      description: data.description,
      transmissionTypeId: data.transmissionTypeId,
      fuelTypeId: data.fuelTypeId,
      seat: data.seat,
      fuelConsumption: data.fuelConsumption,
      requiresCollateral: data.requiresCollateral,
    };

    const imagePayload: CarImagesPayload = {
      carImages: data.carImages,
      paperImages: data.paperImages,
    };

    if (id) {
      updateMutation.mutate({ id, payload: infoPayload });
    } else {
      createMutation.mutate(infoPayload, {
        onSuccess: async (data) => {
          console.log('call api amenityIds');

          patchAmenitiesMutation.mutate({
            id: data.value.id,
            payload: { amenityId: infoPayload.amenityIds || [] },
          });

          await patchImageMutation.mutate({ id: data.value.id, payload: imagePayload.carImages });
          await patchPaperImageMutation.mutate({
            id: data.value.id,
            payload: imagePayload.paperImages,
          });
          queryClient.invalidateQueries({ queryKey: QueryKey.CAR_LIST });
          ToastAndroid.show('Tạo xe thành công', ToastAndroid.SHORT);
          form.reset();
          router.push('/(main)/cars');
        },
      });
    }
  });

  return { form, onSubmit, isLoading: createMutation.isPending || updateMutation.isPending };
};
