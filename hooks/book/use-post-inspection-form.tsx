import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useBookingMutation } from './use-book';

import { BookPostInspectionPayload } from '~/constants/models/book.model';
import { PostInspectionForm, PostInspectionSchema } from '~/constants/schemas/book.schema';
import { QueryKey } from '~/lib/query-key';
import { translate } from '~/lib/translate';

export const usePostInspectionForm = (id: string) => {
  const { postInspectionBooking } = useBookingMutation();
  const queryClient = useQueryClient();
  const form = useForm<PostInspectionForm>({
    resolver: zodResolver(PostInspectionSchema),
    defaultValues: {
      fuelGaugeFinalPhotos: undefined,
      cleanlinessPhotos: undefined,
      scratchesPhotos: undefined,
      tollFeesPhotos: undefined,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    const data: BookPostInspectionPayload = {
      fuelGaugeFinalPhotos: values.fuelGaugeFinalPhotos,
      cleanlinessPhotos: values.cleanlinessPhotos,
      scratchesPhotos: values.scratchesPhotos,
      tollFeesPhotos: values.tollFeesPhotos,
    };

    postInspectionBooking.mutate(
      {
        bookingId: id,
        payload: data,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKey.Booking.get.Detail] });
          ToastAndroid.show(translate.booking.toast.post_inspection, ToastAndroid.SHORT);
          router.back();
          form.reset();
        },
        onError: (error: any) => {
          ToastAndroid.show(error?.message || translate.booking.failed.message, ToastAndroid.SHORT);
        },
      }
    );
  });

  return {
    form,
    onSubmit,
    isLoading: postInspectionBooking.isPending,
    isSuccess: postInspectionBooking.isSuccess,
    isError: postInspectionBooking.isError,
    error: postInspectionBooking.error,
  };
};
