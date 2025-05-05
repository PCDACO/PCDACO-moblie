import { Feather } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Checkbox from 'expo-checkbox';
import { Link, router } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, ToastAndroid, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '~/assets/svg/logo.svg';
import RegisterAccountForm from '~/components/form/auth-form/register/register-account-form';
import RegisterInfoForm from '~/components/form/auth-form/register/register-info-form';
import ResultRegister from '~/components/form/auth-form/register/result-register';
import ValidateOtpInput from '~/components/form/auth-form/register/validate-otp-input';
import { Button } from '~/components/nativewindui/Button';
import { Text as TextUI } from '~/components/nativewindui/Text';
import StepProgress from '~/components/plugins/progress-step';
import { useAuthForm } from '~/hooks/auth/use-auth-form';
import { useStepStore } from '~/store/use-step';
import { COLORS } from '~/theme/colors';

const Register: FunctionComponent = () => {
  const [checked, setChecked] = React.useState(false);
  const { step, prevStep } = useStepStore();
  const { form, isLoading, checkConditionOfEachStep, isLoadingSendOtp, isLoadingVerifyOtp } =
    useAuthForm({ type: 'register' });

  if (step === 4 && !isLoading) {
    return (
      <SafeAreaView className="h-full flex-1 items-center justify-center">
        <ResultRegister form={form} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View className="flex-1 justify-between gap-8 px-6 py-8">
            {/* Logo + Tiêu đề */}
            <View>
              <Button
                size="icon"
                className="bg-background"
                variant="outline"
                onPress={() => router.back()}>
                <Feather name="arrow-left" size={24} />
              </Button>
              {step < 4 && (
                <View className="w-60 flex-row items-center gap-2">
                  <Logo width={100} height={100} />
                  <View className="gap-2">
                    <Text className="w-52 text-3xl font-semibold text-foreground">
                      Chào mừng đến với FreeDriver!
                    </Text>
                  </View>
                </View>
              )}

              {step < 4 && (
                <View>
                  <StepProgress currentStep={step} steps={3} />
                  {/* Form đăng ký */}
                  <View className="mt-6 w-full flex-col items-center gap-4">
                    {/* check step */}
                    {step === 1 && <RegisterAccountForm form={form} />}
                    {step === 2 && <ValidateOtpInput form={form} />}
                    {step === 3 && <RegisterInfoForm form={form} />}
                  </View>
                </View>
              )}
            </View>

            {/* Checkbox & Nút đăng ký */}
            {step !== 4 && (
              <View className="flex-col gap-4">
                {step === 1 && (
                  <>
                    <View className="flex-row items-center gap-2">
                      <Checkbox
                        value={checked}
                        onValueChange={() => {
                          setChecked(!checked);
                        }}
                        color={COLORS.light.primary}
                      />
                      <Text className="w-80 text-foreground">
                        Tôi đã đọc và đồng ý với{' '}
                        <Link className="text-primary" href="/(screen)/privacy">
                          Chính sách & quy định
                        </Link>{' '}
                        và{' '}
                        <Link className="text-primary" href="/(screen)/privacy">
                          Chính sách bảo vệ dữ liệu cá nhân
                        </Link>{' '}
                        của FreeDriver
                      </Text>
                    </View>
                    <Button
                      onPress={() => {
                        if (!checked) {
                          ToastAndroid.show(
                            'Vui lòng đồng ý với chính sách và quy định của FreeDriver',
                            ToastAndroid.SHORT
                          );
                        } else {
                          checkConditionOfEachStep(step);
                        }
                      }}
                      disabled={isLoadingSendOtp}>
                      <TextUI>{isLoadingSendOtp ? 'Đang gửi OTP...' : 'Đăng ký'}</TextUI>
                    </Button>
                  </>
                )}

                {step === 2 && (
                  <View className="flex-row items-center gap-4">
                    <Button variant="secondary" size="icon" onPress={prevStep}>
                      <Icon name="step-backward" color="black" />
                    </Button>

                    <View className="flex-1">
                      <Button
                        variant="secondary"
                        onPress={() => checkConditionOfEachStep(step)}
                        disabled={isLoadingVerifyOtp}>
                        <TextUI>
                          {isLoadingVerifyOtp ? 'Đang xác nhận OTP...' : 'Xác nhận OTP'}
                        </TextUI>
                      </Button>
                    </View>
                  </View>
                )}

                {step === 3 && (
                  <View className="flex-row items-center gap-4">
                    <Button variant="secondary" onPress={prevStep} size="icon">
                      <Icon name="step-backward" color="black" />
                    </Button>
                    <Button
                      className="w-[260px] flex-1"
                      onPress={() => checkConditionOfEachStep(step)}
                      disabled={isLoading}>
                      <TextUI>{isLoading ? 'Đang xử lý...' : 'Hoàn tất đăng ký'}</TextUI>
                    </Button>
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
