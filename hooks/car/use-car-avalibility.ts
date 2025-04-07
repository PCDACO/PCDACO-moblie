import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useCarMutation } from './use-car';

import { carAvailabilitySchema, CarAvailabilitySchema } from '~/constants/schemas/car.schema';
import { QueryKey } from '~/lib/query-key';
import { translate } from '~/lib/translate';

export const useCarAvalibilityForm = (id: string) => {
  const queryClient = useQueryClient();
  const { postAvailabilityMutation } = useCarMutation();

  const form = useForm<CarAvailabilitySchema>({
    resolver: zodResolver(carAvailabilitySchema),
    defaultValues: {
      dates: [],
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    const payload = {
      dates: data.dates.map((date) => new Date(date)),
    };

    postAvailabilityMutation.mutate(
      { id, payload },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QueryKey.Car.Detail, QueryKey.Car.Unavailable, QueryKey.Car.Contact],
          });
          queryClient.invalidateQueries({
            queryKey: [QueryKey.Car.Unavailable],
          });
          ToastAndroid.show(translate.cars.toast.availability, ToastAndroid.SHORT);

          setTimeout(() => {
            router.back();
          }, 1000);
        },
        onError: (error: any) => {
          ToastAndroid.show(
            error.response.data.message || translate.cars.toast.error_availability,
            ToastAndroid.SHORT
          );
        },
      }
    );
  });

  return { form, onSubmit, isLoading: postAvailabilityMutation.isPending };
};
