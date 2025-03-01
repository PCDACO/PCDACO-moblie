import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  AuthPayloads,
  LoginPayload,
  RegisterPayload,
  loginSchema,
  registerSchema,
} from '~/constants/schemas/auth.schema';
import { useAuth } from '~/hooks/auth/use-auth';

type UseAuthFormProps = {
  type: 'login' | 'register';
};

export const useAuthForm = ({ type }: UseAuthFormProps) => {
  const { loginMutation, registerMutation } = useAuth();

  const form = useForm<AuthPayloads>({
    resolver: zodResolver(type === 'login' ? loginSchema : registerSchema),
    defaultValues:
      type === 'login'
        ? { phone: '', password: '' }
        : {
            name: '',
            email: '',
            password: '',
            address: '',
            dateOfBirth: new Date(),
            phone: '',
            roleName: 'Owner',
          },
  });

  const onSubmit = form.handleSubmit((data) => {
    if (type === 'login') {
      loginMutation.mutate(data as LoginPayload);
    } else {
      registerMutation.mutate(data as RegisterPayload);
    }
  });

  return { form, onSubmit, isLoading: loginMutation.isPending || registerMutation.isPending };
};
