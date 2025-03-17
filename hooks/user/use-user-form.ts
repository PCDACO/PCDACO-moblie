import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useUserMutation } from './use-user';

import { UserPayloadSchema, userSchema } from '~/constants/schemas/user.schema';

interface UserFormProps {
  id: string;
}

export const useUserForm = ({ id }: UserFormProps) => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const { updateUserMutation } = useUserMutation();
  const form = useForm<UserPayloadSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      dateOfBirth: new Date(),
      phone: '',
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    updateUserMutation.mutate(
      { id, payload: data },
      {
        onSuccess: (data) => {
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
          setIsSuccess(true);
          router.back();
        },
        onError: (error) => {
          setIsSuccess(false);
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        },
      }
    );
  });

  return { form, onSubmit, isLoading: updateUserMutation.isPending, isSuccess };
};
