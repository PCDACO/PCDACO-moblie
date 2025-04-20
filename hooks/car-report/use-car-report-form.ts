import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useCarReportMutation } from './use-car-report';

import { CarReportPayload } from '~/constants/models/car-report.model';
import { CarReportSchema, CarReportSchemaType } from '~/constants/schemas/car-report.schema';
import { QueryKey } from '~/lib/query-key';
import { translate } from '~/lib/translate';

export const useCarReportForm = () => {
  const queryClient = useQueryClient();
  const { createMutation, patchImageMutation } = useCarReportMutation();

  const form = useForm<CarReportSchemaType>({
    resolver: zodResolver(CarReportSchema),
    defaultValues: {
      carId: '',
      title: '',
      description: '',
      reportType: 0,
      files: [],
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    const payload: CarReportPayload = {
      carId: data.carId,
      title: data.title,
      description: data.description,
      reportType: data.reportType,
    };

    const file = data.files;

    createMutation.mutate(payload, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: [QueryKey.CarReport.List] });
        queryClient.invalidateQueries({ queryKey: [QueryKey.Car.Detail] });

        if (file && file.length > 0) {
          patchImageMutation.mutate(
            { reportId: data.value.id, file },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [QueryKey.CarReport.List] });
                queryClient.invalidateQueries({ queryKey: [QueryKey.Car.Detail] });

                form.reset();

                ToastAndroid.show(
                  translate.car_report.toast.create || 'Đã gửi báo cáo thành công',
                  ToastAndroid.SHORT
                );
                setTimeout(() => {
                  router.replace('/(third)/car-report');
                }, 1000);
              },
              onError: (error: any) => {
                ToastAndroid.show(
                  error.response.data.message || 'Gửi báo cáo thất bại',
                  ToastAndroid.SHORT
                );
              },
            }
          );
        } else {
          form.reset();

          setTimeout(() => {
            router.replace('/(third)/car-report');

            ToastAndroid.show(
              translate.car_report.toast.create || 'Đã gửi báo cáo thành công',
              ToastAndroid.SHORT
            );
          }, 1000);
        }
      },
      onError: (error: any) => {
        ToastAndroid.show(
          error.response.data.message || 'Gửi báo cáo thất bại',
          ToastAndroid.SHORT
        );
      },
    });
  });

  return {
    form,
    onSubmit,
    isLoading: createMutation.isPending || patchImageMutation.isPending,
    isSuccess: createMutation.isSuccess,
    isError: createMutation.isError,
  };
};
