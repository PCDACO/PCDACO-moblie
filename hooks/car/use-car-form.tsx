import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useCarMutation } from './use-car';

import { CarPayloadSchema, carSchema } from '~/constants/schemas/car.schema';
import { useStepStore } from '~/store/use-step';

export const useCarForm = () => {
  const { nextStep } = useStepStore();

  const { createMutation, updateMutation } = useCarMutation();

  const validField = async (isValidPromise: Promise<boolean>) => {
    const isValid = await isValidPromise;
    if (isValid) {
      return true;
    } else {
      ToastAndroid.show('Vui lòng điền đúng thông tin', ToastAndroid.SHORT);
      return false;
    }
  };

  const checkConditionOfEachStep = async (step: number) => {
    switch (step) {
      case 1: {
        const isValidate = await validField(form.trigger(['carImages']));
        if (isValidate) {
          nextStep();
        }
        return isValidate;
      }
      case 2: {
        const isValidate = await validField(
          form.trigger([
            'modelId',
            'pickupAddress',
            'pickupLongitude',
            'pickupLatitude',
            'fuelTypeId',
            'transmissionTypeId',
            'licensePlate',
            'color',
            'seat',
            'fuelConsumption',
          ])
        );
        if (isValidate) {
          nextStep();
        }
        return isValidate;
      }
      case 3: {
        const isValidate = await validField(form.trigger(['amenityIds']));
        if (isValidate) {
          nextStep();
        }
        return isValidate;
      }
      case 4: {
        const isValidate = await validField(form.trigger(['description']));
        if (isValidate) {
          nextStep();
        }
        return isValidate;
      }
      case 5: {
        const isValidate = await validField(form.trigger(['price', 'terms', 'requiresCollateral']));
        if (isValidate) {
          nextStep();
        }
        return isValidate;
      }
      case 6: {
        const isValidate = await validField(form.trigger(['paperImages']));
        if (isValidate) {
          nextStep();
        }
        return isValidate;
      }
      case 7: {
        nextStep();
      }
    }
  };

  const form = useForm<CarPayloadSchema>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      carImages: [],
      terms: '',
      paperImages: [],
      modelId: '',
      price: 0,
      licensePlate: '',
      color: '',
      amenityIds: [],
      description: '',
      transmissionTypeId: '',
      pickupAddress: '',
      pickupLongitude: 0,
      pickupLatitude: 0,
      fuelTypeId: '',
      seat: 0,
      fuelConsumption: 0,
      requiresCollateral: false,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return {
    form,
    onSubmit,
    checkConditionOfEachStep,
    isLoading: createMutation.isPending || updateMutation.isPending,
  };
};
