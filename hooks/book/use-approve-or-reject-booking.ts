import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { ToastAndroid } from 'react-native';

import { useBookingMutation } from './use-book';

import { QueryKey } from '~/lib/query-key';
import { translate } from '~/lib/translate';

interface UseApproveOrRejectBooking {
  id: string;
}

export const useApproveOrRejectBooking = ({ id }: UseApproveOrRejectBooking) => {
  if (!id) {
    throw new Error('Id is required');
  }

  const queryClient = useQueryClient();

  const { approveOrRejectBooking } = useBookingMutation();

  const handleApproveOrRejectBooking = (status: boolean, signature?: string) => {
    approveOrRejectBooking.mutate(
      {
        bookingId: id,
        payload: {
          isApproved: status,
          signature,
        },
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: [QueryKey.Booking.get.Detail, id] });
          queryClient.invalidateQueries({ queryKey: [QueryKey.Booking.get.List] });
          ToastAndroid.show(
            data.message || status
              ? translate.booking.toast.approve
              : translate.booking.toast.reject,
            ToastAndroid.SHORT
          );
          setTimeout(() => {
            router.back();
          }, 1000);
        },
        onError: (error: any) => {
          ToastAndroid.show(error.response.data.message || 'Xác nhận lỗi', ToastAndroid.SHORT);
        },
      }
    );
  };

  return {
    handleApproveOrRejectBooking,
    isLoading: approveOrRejectBooking.isPending,
  };
};
