import { router } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { Controller } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/ui/button';
import { useAuthForm } from '~/hooks/auth/use-auth-form';
import { Lock, Phone } from '~/lib/icons/icon';

const LoginScreen: FunctionComponent = () => {
  const { form, onSubmit, isLoading } = useAuthForm({ type: 'login' });

  return (
    <SafeAreaView className="flex-1 justify-center bg-background px-6">
      <Text className="mb-2 text-center text-2xl font-bold">Đăng nhập</Text>
      <View className="mb-4">
        <Text className="text-sm font-medium">Số điện thoại*</Text>
        <View className="mt-1 flex-row items-center rounded-lg border border-muted-foreground px-3 py-2">
          <Phone size={18} className="text-muted-foreground" />
          <Controller
            control={form.control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="phone-pad"
                placeholder="Nhập số điện thoại..."
                className="ml-2 flex-1 text-foreground"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>
        {form.formState.errors.phone && (
          <Text className="text-xs text-destructive">{form.formState.errors.phone.message}</Text>
        )}
      </View>

      <View className="mb-4">
        <Text className="text-sm font-medium">Mật khẩu*</Text>
        <View className="mt-1 flex-row items-center rounded-lg border border-muted-foreground px-3 py-2">
          <Lock size={18} className="text-muted-foreground" />
          <Controller
            control={form.control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Nhập mật khẩu..."
                className="ml-2 flex-1 text-foreground"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>
        {form.formState.errors.password && (
          <Text className="text-xs text-destructive">{form.formState.errors.password.message}</Text>
        )}
      </View>

      <Button className="w-full rounded-lg bg-primary py-3" onPress={onSubmit} disabled={isLoading}>
        <Text className="text-center font-semibold text-background">
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Text>
      </Button>
      <View>
        <Text className="mt-4 text-center text-muted-foreground">
          Bạn chưa có tài khoản?{' '}
          <Text
            onPress={() =>
              router.push({
                pathname: '/(auth)/register',
              })
            }
            className="font-semibold text-primary">
            Đăng ký ngay
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
