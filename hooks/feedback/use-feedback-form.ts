import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { UseFeedbackCreate } from './use-feedback';

import { feedbackSchema, FeedbackSchema } from '~/constants/schemas/feedback.schema';
import { QueryKey } from '~/lib/query-key';
import { translate } from '~/lib/translate';

export const useFeedbackForm = (id: string) => {
  const queryClient = useQueryClient();
  const { createFeedbackMutation } = UseFeedbackCreate();
  const form = useForm<FeedbackSchema>({ resolver: zodResolver(feedbackSchema) });

  const onSubmit = form.handleSubmit((data) => {
    createFeedbackMutation.mutate(
      { id, data },
      {
        onSuccess: (data) => {
          ToastAndroid.show(data.message || translate.feedback.toast.create, ToastAndroid.SHORT);
          queryClient.invalidateQueries({ queryKey: [QueryKey.Booking.get.Detail, id] });
          form.reset();
        },
        onError: (error: any) => {
          ToastAndroid.show(
            error.response?.data.message || translate.feedback.toast.error_create,
            ToastAndroid.SHORT
          );
        },
      }
    );
  });

  return {
    form,
    onSubmit,
    isLoading: createFeedbackMutation.isPending,
  };
};
