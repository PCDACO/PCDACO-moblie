import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useCarMutation } from './use-car';

import { CarPayload } from '~/constants/models/car.model';
import { CarPayloadSchema, carSchema } from '~/constants/schemas/car.schema';
import { useStepStore } from '~/store/use-step';

interface UseCarFormProps {
  id: string;
}

export const useCarForm = ({ id }: UseCarFormProps) => {
  const { nextStep, resetStep } = useStepStore();

  const {
    createMutation,
    updateMutation,
    patchImageMutation,
    patchPaperImageMutation,
    patchAmenitiesMutation,
  } = useCarMutation();

  const validField = async (isValidPromise: Promise<boolean>) => {
    const isValid = await isValidPromise;
    if (isValid) {
      return true;
    } else {
      ToastAndroid.show('Vui lòng điền đúng thông tin', ToastAndroid.SHORT);
      return false;
    }
  };

  const checkConditionOfEachStep = async (step: number, id: string) => {
    switch (step) {
      case 1: {
        console.log('have id');

        if (id) {
          nextStep();
          return;
        }

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
    const carPayload: CarPayload = {
      amenityIds: data.amenityIds,
      modelId: data.modelId,
      transmissionTypeId: data.transmissionTypeId,
      fuelTypeId: data.fuelTypeId,
      licensePlate: data.licensePlate,
      color: data.color,
      seat: data.seat,
      description: data.description,
      fuelConsumption: data.fuelConsumption,
      requiresCollateral: data.requiresCollateral,
      price: data.price,
      pickupAddress: data.pickupAddress,
      pickupLongitude: data.pickupLongitude,
      pickupLatitude: data.pickupLatitude,
      terms: data.terms,
    };

    if (id) {
      updateMutation.mutate({ id, payload: carPayload });
    } else {
      createMutation.mutate(carPayload, {
        onSuccess: (response) => {
          patchImageMutation.mutate(
            { id: response.value.id, payload: data.carImages },
            {
              onSuccess: () => {
                patchPaperImageMutation.mutate({
                  id: response.value.id,
                  payload: data.paperImages,
                });

                ToastAndroid.show('Đăng ký xe thành công', ToastAndroid.SHORT);
              },
              onError: (error) => {
                console.log('error', error);
              },
            }
          );

          resetStep();
        },
        onError: (error) => {
          console.log('error', error);
          ToastAndroid.show('Đăng ký xe thất bại', ToastAndroid.SHORT);
        },
      });
    }
  });

  return {
    form,
    onSubmit,
    checkConditionOfEachStep,
    isLoading:
      (createMutation.isPending &&
        patchImageMutation.isPending &&
        patchPaperImageMutation.isPending) ||
      updateMutation.isPending,
    isError: createMutation.isError || updateMutation.isError,
    isSuccess:
      (createMutation.isSuccess &&
        patchImageMutation.isSuccess &&
        patchPaperImageMutation.isSuccess) ||
      updateMutation.isSuccess,
  };
};
