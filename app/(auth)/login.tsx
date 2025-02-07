import React, { FunctionComponent } from 'react';
import { Controller } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/ui/button';
import { useAuthForm } from '~/hooks/auth/use-auth-form';
import { Lock, Mail } from '~/lib/icons/icon';

const LoginScreen: FunctionComponent = () => {
  const { form, onSubmit, isLoading } = useAuthForm({ type: 'login' });

  return (
    <SafeAreaView className="flex-1 justify-center bg-white px-6">
      <Text className="mb-2 text-center text-2xl font-bold">Đăng nhập</Text>

      <View className="mb-4">
        <Text className="text-sm font-medium">Email*</Text>
        <View className="mt-1 flex-row items-center rounded-lg border border-gray-300 px-3 py-2">
          <Mail size={18} className="text-gray-400" />
          <Controller
            control={form.control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Nhập email..."
                className="ml-2 flex-1 text-gray-700"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>
        {form.formState.errors.email && (
          <Text className="text-xs text-red-500">{form.formState.errors.email.message}</Text>
        )}
      </View>

      <View className="mb-4">
        <Text className="text-sm font-medium">Mật khẩu*</Text>
        <View className="mt-1 flex-row items-center rounded-lg border border-gray-300 px-3 py-2">
          <Lock size={18} className="text-gray-400" />
          <Controller
            control={form.control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Nhập mật khẩu..."
                className="ml-2 flex-1 text-gray-700"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>
        {form.formState.errors.password && (
          <Text className="text-xs text-red-500">{form.formState.errors.password.message}</Text>
        )}
      </View>

      <Button
        className="w-full rounded-lg bg-blue-500 py-3"
        onPress={onSubmit}
        disabled={isLoading}>
        <Text className="text-center font-semibold text-white">
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Text>
      </Button>
    </SafeAreaView>
  );
};

export default LoginScreen;
