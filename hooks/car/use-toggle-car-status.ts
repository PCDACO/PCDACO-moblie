import { useQueryClient } from '@tanstack/react-query';
import { ToastAndroid } from 'react-native';

import { useCarMutation } from './use-car';

import { CarStatus } from '~/constants/enums';
import { QueryKey } from '~/lib/query-key';
import { translate } from '~/lib/translate';

interface ToggleCarStatusProps {
  id: string;
}

export const useToggleCarStatus = ({ id }: ToggleCarStatusProps) => {
  const { postEnableMutation, postDisableMutation } = useCarMutation();
  const queryClient = useQueryClient();

  const handleToggleCarStatus = (status: CarStatus.Available | CarStatus.Inactive) => {
    switch (status) {
      case CarStatus.Available:
        postEnableMutation.mutate(id, {
          onSuccess: (response) => {
            ToastAndroid.show(response.message || translate.cars.toast.enable, ToastAndroid.SHORT);
            queryClient.invalidateQueries({ queryKey: [QueryKey.Car.Detail, id] });
            queryClient.invalidateQueries({ queryKey: [QueryKey.Car.List] });
          },
          onError: (error: any) => {
            ToastAndroid.show(
              error.response.data.message || translate.cars.toast.error_enable,
              ToastAndroid.SHORT
            );
          },
        });
        break;
      case CarStatus.Inactive:
        postDisableMutation.mutate(id, {
          onSuccess: (response) => {
            ToastAndroid.show(response.message || translate.cars.toast.disable, ToastAndroid.SHORT);
            queryClient.invalidateQueries({ queryKey: [QueryKey.Car.Detail, id] });
            queryClient.invalidateQueries({ queryKey: [QueryKey.Car.List] });
          },
          onError: (error: any) => {
            ToastAndroid.show(
              error.response.data.message || translate.cars.toast.error_disable,
              ToastAndroid.SHORT
            );
          },
        });
        break;
    }
  };

  return {
    isloading: postEnableMutation.isPending || postDisableMutation.isPending,
    handleToggleCarStatus,
  };
};
