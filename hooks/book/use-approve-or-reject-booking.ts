import { useQueryClient } from '@tanstack/react-query';
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

  const handleApproveOrRejectBooking = (status: boolean) => {
    approveOrRejectBooking.mutate(
      {
        bookingId: id,
        payload: {
          isApproved: status,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKey.Booking.get.Detail, id] });
          queryClient.invalidateQueries({ queryKey: [QueryKey.Booking.get.List] });
          ToastAndroid.show(
            status ? translate.booking.toast.approve : translate.booking.toast.reject,
            ToastAndroid.SHORT
          );
        },
        onError: (error: any) => {
          ToastAndroid.show(error.message || 'Xác nhận lỗi', ToastAndroid.SHORT);
        },
      }
    );
  };

  return {
    handleApproveOrRejectBooking,
  };
};
