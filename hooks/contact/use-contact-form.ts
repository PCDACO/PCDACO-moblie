import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useCarMutation } from '../car/use-car';

import { ContractPayloadSchema, contractSchema } from '~/constants/schemas/contract.schema';
import { QueryKey } from '~/lib/query-key';
import { translate } from '~/lib/translate';

export const useContractForm = (id: string) => {
  const queryClient = useQueryClient();
  const { postAssignContractMutation } = useCarMutation();

  const form = useForm<ContractPayloadSchema>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      signature: '',
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    postAssignContractMutation.mutate(
      { id, signature: data.signature },
      {
        onSuccess: (data) => {
          form.reset();
          queryClient.invalidateQueries({ queryKey: [QueryKey.Contact.get.preview, id] });
          ToastAndroid.show(data.message || translate.cars.toast.success_sign, ToastAndroid.SHORT);

          setTimeout(() => {
            router.back();
          }, 3000);
        },
        onError: (error: any) => {
          ToastAndroid.show(
            error.response.data.message || translate.cars.toast.error_sign,
            ToastAndroid.SHORT
          );
        },
      }
    );
  });
  return {
    form,
    onSubmit,
    isLoading: postAssignContractMutation.isPending,
    isSuccess: postAssignContractMutation.isSuccess,
    isError: postAssignContractMutation.isError,
  };
};
