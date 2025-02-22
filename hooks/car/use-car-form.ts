import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCarMutation } from './use-car';

import { CarPayloadSchema, carSchema } from '~/constants/schemas/car.schema';
import useIDStore from '~/stores/store';

export const useCarForm = () => {
  const { createMutation, updateMutation } = useCarMutation();
  const { id } = useIDStore();

  const form = useForm<CarPayloadSchema>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      modelId: '',
      price: 0,
      licensePlate: '',
      color: '',
      amenityIds: [],
      description: '',
      transmissionTypeId: '',
      fuelTypeId: '',
      seat: 0,
      fuelConsumption: 0,
      requiresCollateral: false,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    if (id) {
      updateMutation.mutate({ id, payload: data });
    } else {
      createMutation.mutate(data, {
        onSuccess: (data) => {
          form.reset();
          console.log('log on form', data.value.id);
        },
      });
    }
  });

  return { form, onSubmit, isLoading: createMutation.isPending || updateMutation.isPending };
};
