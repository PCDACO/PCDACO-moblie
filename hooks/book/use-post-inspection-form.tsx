import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useBookingMutation } from './use-book';

import { PostInspectionForm, PostInspectionSchema } from '~/constants/schemas/book.schema';

export const usePostInspectionForm = () => {
  const { postInspectionBooking } = useBookingMutation();
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
    console.log('Form submitted:', values);
    // Handle form submission logic here
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
