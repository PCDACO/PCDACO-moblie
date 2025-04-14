import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useBookingMutation } from './use-book';

import { BookPreInspectionPayload } from '~/constants/models/book.model';
import { PreInspectionForm, PreInspectionSchema } from '~/constants/schemas/book.schema';
import { QueryKey } from '~/lib/query-key';
import { translate } from '~/lib/translate';

interface UsePreInspectionForm {
  id: string;
}

export const usePreInspectionForm = ({ id }: UsePreInspectionForm) => {
  const { inspectionBooking } = useBookingMutation();
  const queryClient = useQueryClient();
  const form = useForm<PreInspectionForm>({
    resolver: zodResolver(PreInspectionSchema),
    defaultValues: {
      exteriorPhotos: undefined,
      fuelGaugePhotos: undefined,
      carKeyPhotos: undefined,
      trunkPhotos: undefined,
      parkingLocationPhotos: undefined,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    const data: BookPreInspectionPayload = {
      exteriorPhotos: values.exteriorPhotos || [],
      fuelGaugePhotos: values.fuelGaugePhotos || [],
      carKeyPhotos: values.carKeyPhotos || [],
      trunkPhotos: values.trunkPhotos || [],
      parkingLocationPhotos: values.parkingLocationPhotos || [],
    };

    inspectionBooking.mutate(
      {
        bookingId: id,
        payload: data,
      },
      {
        onSuccess: () => {
          ToastAndroid.show(translate.booking.toast.pre_inspection, ToastAndroid.SHORT);
          queryClient.invalidateQueries({ queryKey: [QueryKey.Booking.get.Detail] });
          router.back();
          form.reset();
        },
        onError: (error: any) => {
          ToastAndroid.show(
            error.response.data.message || translate.booking.failed.message,
            ToastAndroid.SHORT
          );
        },
      }
    );
  });

  return {
    form,
    onSubmit,
    isLoading: inspectionBooking.isPending,
    isSuccess: inspectionBooking.isSuccess,
    isError: inspectionBooking.isError,
    error: inspectionBooking.error,
  };
};
