import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import * as React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LoginForm from '~/components/form/auth-form/login-form';
import { Button } from '~/components/nativewindui/Button';
import { Text as TextUI } from '~/components/nativewindui/Text';
import Description from '~/components/screens/car-editor/description';
import { useAuthForm } from '~/hooks/auth/use-auth-form';
import { useStepStore } from '~/store/use-step';

const LoginScreen = () => {
  const router = useRouter();
  const { resetStep } = useStepStore();
  const { form, isLoading, onSubmit } = useAuthForm({ type: 'login' });

  return (
    <SafeAreaView>
      <View className="relative h-screen justify-between px-6 py-10">
        {/* Header */}
        <View className=" gap-2">
          <Button
            size="icon"
            className="bg-background"
            variant="outline"
            onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} />
          </Button>
          <View className="mt-4 gap-1">
            <Text className="text-3xl font-semibold text-foreground">Đăng nhập</Text>
            <Description
              className="text-md"
              title="Truy cập tài khoản để đăng xe và kết nối với người thuê."
            />
          </View>
        </View>

        <View className="w-full gap-2">
          <LoginForm form={form} />
          <Link href="/forget-password" className="self-end" onPress={() => resetStep()}>
            <Text className="text-foreground/60 font-semibold">Quên mật khẩu?</Text>
          </Link>

          <View className="mt-4 gap-4">
            <Button onPress={onSubmit} disabled={isLoading}>
              <TextUI>{isLoading ? 'Đang xử lý...' : 'Đăng nhập'}</TextUI>
            </Button>
            <Button
              variant="plain"
              onPress={() => {
                resetStep();
                router.navigate('/register');
              }}>
              <TextUI>Đăng kí tài khoản</TextUI>
            </Button>
          </View>
        </View>

        <View className="flex-row items-center justify-center">
          <View className="w-80">
            <Text className="text-center text-muted">
              Để đảm bảo quyền lợi của bạn, xin vui lòng xem kỹ{' '}
              <Link className="text-primary" href="/(screen)/privacy">
                chính sách của chúng tôi
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
