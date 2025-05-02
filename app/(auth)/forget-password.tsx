'use client';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { type FunctionComponent } from 'react';
import { Controller } from 'react-hook-form';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import FieldLayout from '~/components/layouts/field-layout';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import CardBasic from '~/components/plugins/card-basic';
import Loading from '~/components/plugins/loading';
import { Input } from '~/components/screens/splash/input-with-icon';
import StepIndicator from '~/components/screens/splash/step-indecator';
import { useForgetPasswordForm } from '~/hooks/auth/use-forget-password-form';
import { useStepStore } from '~/store/use-step';
import { COLORS } from '~/theme/colors';

const ForgetPassword: FunctionComponent = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { form, checkConditionOfEachStep } = useForgetPasswordForm();
  const { step } = useStepStore();

  const stepLabels = ['Thay đổi mật khẩu', 'Nhập OTP', 'Nhập mật khẩu mới', 'Hoàn thành'];

  const stepDescriptions = [
    'Vui lòng nhập email để xác thực tài khoản của bạn',
    'Vui lòng nhập OTP để xác thực tài khoản của bạn',
    'Vui lòng nhập mật khẩu mới',
    'Đổi mật khẩu thành công',
  ];

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await checkConditionOfEachStep(step);
    } finally {
      setIsLoading(false);
    }
  };

  console.log('step', step);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="h-full flex-1 bg-gray-50 px-4 py-6 dark:bg-gray-900">
        <View className="flex-1 justify-center">
          <CardBasic className="mx-auto w-full max-w-md">
            <View className="gap-6 p-4">
              {/* Step indicator */}
              <StepIndicator
                currentStep={step}
                totalSteps={4}
                labels={stepLabels}
                descriptions={stepDescriptions}
              />

              {/* Form fields */}
              <Animated.View
                entering={FadeIn.duration(300)}
                exiting={FadeOut.duration(200)}
                className="mt-4">
                {step === 1 && (
                  <FieldLayout label="Email">
                    <Controller
                      control={form.control}
                      name="email"
                      render={({ field, fieldState }) => (
                        <Input
                          {...field}
                          placeholder="Nhập email của bạn"
                          onChangeText={(text) => field.onChange(text)}
                          textContentType="emailAddress"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          leftIcon={
                            <MaterialCommunityIcons name="email-outline" size={20} color="gray" />
                          }
                          error={fieldState.error?.message}
                          touched={fieldState.isTouched}
                        />
                      )}
                    />
                  </FieldLayout>
                )}

                {step === 2 && (
                  <View className="gap-4">
                    <FieldLayout label="OTP">
                      <Controller
                        control={form.control}
                        name="otp"
                        render={({ field, fieldState }) => (
                          <Input
                            {...field}
                            placeholder="Nhập mã OTP"
                            onChangeText={(text) => field.onChange(text)}
                            leftIcon={
                              <MaterialCommunityIcons name="numeric" size={20} color="gray" />
                            }
                            keyboardType="numeric"
                            maxLength={6}
                            error={fieldState.error?.message}
                            touched={fieldState.isTouched}
                          />
                        )}
                      />
                    </FieldLayout>

                    <Button
                      variant="link"
                      onPress={() => checkConditionOfEachStep(1)}
                      className="self-end">
                      <Text className="text-blue-500">Gửi lại mã OTP</Text>
                    </Button>
                  </View>
                )}

                {step === 3 && (
                  <FieldLayout label="Mật khẩu mới">
                    <Controller
                      control={form.control}
                      name="newPassword"
                      render={({ field, fieldState }) => (
                        <Input
                          {...field}
                          placeholder="Nhập mật khẩu mới"
                          onChangeText={(text) => field.onChange(text)}
                          leftIcon={
                            <MaterialCommunityIcons name="lock-outline" size={20} color="gray" />
                          }
                          rightIcon={
                            <MaterialCommunityIcons
                              name={showPassword ? 'eye-off' : 'eye'}
                              size={20}
                              color="gray"
                              onPress={() => setShowPassword(!showPassword)}
                            />
                          }
                          secureTextEntry={!showPassword}
                          error={fieldState.error?.message}
                          touched={fieldState.isTouched}
                        />
                      )}
                    />
                  </FieldLayout>
                )}

                {step === 4 && (
                  <View className="items-center gap-4 py-6">
                    <View className="items-center ">
                      <View className="mb-4 rounded-full bg-green-100 p-4">
                        <MaterialCommunityIcons name="check" size={40} color="green" />
                      </View>
                      <Text className="mb-2 text-center text-lg font-medium">
                        Đổi mật khẩu thành công
                      </Text>
                    </View>
                    <Text className="text-center text-gray-500">
                      Bạn đã đổi mật khẩu thành công. Vui lòng đăng nhập lại với mật khẩu mới.
                    </Text>
                    <Button
                      size="lg"
                      onPress={() => {
                        router.back();
                      }}>
                      <Feather name="arrow-left" size={20} color={COLORS.white} />
                      <Text>Đăng nhập</Text>
                    </Button>
                  </View>
                )}
              </Animated.View>

              {/* Action buttons */}
              <View className="mt-4 gap-3">
                {step < 4 && (
                  <Button size="lg" onPress={handleSubmit} disabled={isLoading}>
                    {isLoading ? (
                      <Loading size="small" />
                    ) : (
                      <Text className="font-medium text-white">Tiếp tục</Text>
                    )}
                  </Button>
                )}

                <Button
                  size="lg"
                  onPress={() => router.back()}
                  variant={step === 4 ? 'default' : 'secondary'}>
                  <Text className={step === 4 ? 'text-white' : 'text-gray-700'}>
                    {step === 4 ? 'Đăng nhập' : 'Quay lại'}
                  </Text>
                </Button>
              </View>
            </View>
          </CardBasic>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ForgetPassword;
